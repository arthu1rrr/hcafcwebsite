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