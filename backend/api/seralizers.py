from rest_framework import serializers
from .models import Team,Player,Match

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'code', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class PlayerSerializer(serializers.ModelSerializer):
    headshot_url = serializers.ImageField(required=False,allow_null=True)

    class Meta:
        model = Player
        fields = [
            'id', 'first_name', 'last_name', 'pronouns', 'primary_team', 'position',
            'shirt_number', 'is_active', 'is_committee', 'committee_role', 'headshot',
            'headshot_url', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'headshot_url']

class MatchSerializer(serializers.ModelSerializer):
    match_team_name = serializers.CharField(source="match_team.name", read_only=True)
    match_team_code = serializers.CharField(source="match_team.code", read_only=True)

    class Meta:
        model = Match
        fields = [
            'id', 'date', 'match_team', 'match_team_name', 'match_team_code', 'team_against',
            'competition', 'venue', 'home_match', 'match_completed',
            'home_team_score', 'away_team_score', 'source_link',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'match_team_name', 'match_team_code', 'source_link']

        def validate(self, data):
            if data.get('match_completed'):
                if data.get('home_team_score') is None or data.get('away_team_score') is None:
                    raise serializers.ValidationError("Scores must be provided if the match is completed.")
            return data