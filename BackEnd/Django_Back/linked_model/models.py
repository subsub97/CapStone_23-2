# models.py
from django.db import models

class FileModel(models.Model):
    file = models.FileField()

