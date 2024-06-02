from rest_framework import serializers
from . import models

class TodoSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Todo
		fields = ['id', 'title', 'content', 'done', 'created_at', 'updated_at']