from rest_framework import serializers
from .models import Team,Player

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