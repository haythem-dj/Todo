from django.contrib import admin
from . import models

# Register your models here.
class TodoAdmin(admin.ModelAdmin):
	list_display = ('title', 'created_at', 'updated_at')

admin.site.register(models.Todo, TodoAdmin)