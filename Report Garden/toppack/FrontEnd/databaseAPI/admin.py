from django.contrib import admin
from .models import Repository,Package
# Register your models here.
admin.site.register(Repository)
admin.site.register(Package)