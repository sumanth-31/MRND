from django.db import models

# Create your models here.
class Repository(models.Model):
    repid=models.IntegerField(primary_key=True)
class Package(models.Model):
    name=models.CharField(max_length=30,primary_key=True)
    count=models.IntegerField()