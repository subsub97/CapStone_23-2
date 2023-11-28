from rest_framework import serializers
from .models import FileModel

class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = FileModel
        fields = ('id', 'file')

class TextSerializer(serializers.Serializer):
    text = serializers.CharField()