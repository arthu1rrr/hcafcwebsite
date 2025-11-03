from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Team, Match
import requests
from bs4 import BeautifulSoup   

class Command(BaseCommand):
    help = "Import fixtures and results from FA Full-Time pages for all teams with a source_url"

    def handle(self, *args, **options):
        teams = Team.objects.exclude(source_url="").all()
        if not teams:
            self.stdout.write(self.style.WARNING("No teams have a source_url set."))
            return

        for team in teams:
            self.stdout.write(f"Fetching fixtures for {team.name}...")
            try:
                fixtures = self.fetch_team_fixtures(team.source_url)
                self.sync_matches(team, fixtures)
            except Exception as e:
                self.stderr.write(f"Error importing for {team.name}: {e}")

    # ---------- core logic placeholders ----------

    def fetch_team_fixtures(self, url):
        """
        Fetch and parse the HTML from the team's FA Full-Time page.
        Returns a list of dicts:
        [
            {
                "date": datetime.date,
                "opponent": str,
                "competition": str,
                "venue": str,
                "home_match": bool,
                "completed": bool,
                "home_score": int|None,
                "away_score": int|None,
            },
            ...
        ]
        """
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        results_table = soup.find('div', class_='results-table table-scroll').find('table')
        fixtures_table = soup.find('div', class_='fixtures-table table-scroll').find('table')
        fixtures = []
        if results_table:
            rows = results_table.find('tbody').find_all('tr')
            
            for row in rows:
                cols = row.find_all('td')
                
                competition = cols[0].get_text(strip=True)
                
                date_str = cols[1].get_text(strip=True)
                date_str = date_str[:-5]
                date = timezone.datetime.strptime(date_str, "%d/%m/%y").date()
                home_team = cols[2].get_text(strip=True)
                score_str = cols[4].get_text(strip=True)
                away_team = cols[6].get_text(strip=True)
                venue = "Home" if "Homerton" in home_team else "Away"
                home_match = venue == "Home"
                completed = True
                if score_str and '-' in score_str:

                    home_score, away_score = map( str,score_str.split('-'))
                    if home_score.isdigit():
                        home_score = int(home_score)
                    else:
                        home_score = None   
                    if away_score.isdigit():
                        away_score = int(away_score)
                    else:
                        away_score = None
                else:
                    home_score, away_score = None, None
                opponent = away_team if home_match else home_team
                fixtures.append({
                    "date": date,
                    "opponent": opponent,
                    "competition": competition,
                    "venue": venue,
                    "home_match": home_match,
                    "completed": completed,
                    "home_score": home_score,
                    "away_score": away_score,
                })

        if fixtures_table:
            rows = fixtures_table.find('tbody').find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                competition = cols[0].get_text(strip=True)
                date_str = cols[1].get_text(strip=True)
                date_str = date_str[:-5]
                date = timezone.datetime.strptime(date_str, "%d/%m/%y").date()
                home_team = cols[2].get_text(strip=True)
                score_str = cols[4].get_text(strip=True)
                away_team = cols[6].get_text(strip=True)
                venue = "Home" if "Homerton" in home_team else "Away"
                home_match = venue == "Home"
                completed = False
                home_score, away_score = None, None
                opponent = away_team if home_match else home_team
                fixtures.append({
                    "date": date,
                    "opponent": opponent,
                    "competition": competition,
                    "venue": venue,
                    "home_match": home_match,
                    "completed": completed,
                    "home_score": home_score,
                    "away_score": away_score,
                })

                
        
        return fixtures

    def sync_matches(self, team, fixtures):
        """
        Upsert Match objects based on fetched fixtures.
        """
        count_created, count_updated = 0, 0
        for f in fixtures:
            obj, created = Match.objects.update_or_create(
                match_team=team,
                date=f["date"],
                team_against=f["opponent"],
                defaults=dict(
                    competition=f["competition"],
                    venue=f["venue"],
                    home_match=f["home_match"],
                    match_completed=f["completed"],
                    home_team_score=f["home_score"],
                    away_team_score=f["away_score"],
                    updated_at=timezone.now(),
                ),
            )
            if created:
                count_created += 1
            else:
                count_updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{team.name}: {count_created} new, {count_updated} updated."
            )
        )