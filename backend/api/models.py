from django.db import models

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=100,unique=True)
    code = models.CharField(max_length=10,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    def __str__(self):
        return self.name
    
class Player(models.Model):
    class PositionChoices(models.TextChoices):
        GOALKEEPER = 'GK', 'Goalkeeper'
        DEFENDER = 'DF', 'Defender'
        MIDFIELDER = 'MF', 'Midfielder'
        FORWARD = 'FW', 'Forward'
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    pronouns = models.CharField(max_length=20, blank=True)
    primary_team = models.ForeignKey('api.Team', related_name='players', on_delete=models.PROTECT)
    position = models.CharField(max_length=30, choices=PositionChoices.choices, blank=True)
    shirt_number = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    is_committee = models.BooleanField(default=False)
    committee_role = models.CharField(max_length=100, blank=True)
    headshot = models.ImageField(upload_to='headshots/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['last_name', 'first_name']
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.primary_team.name})"