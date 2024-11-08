from rest_framework import serializers
from .models import Product, Category, Request

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    # is_claimed = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer) : 
    class Meta: 
        model = Request
        fields = '__all__'


# class ClaimedSerializer(serializers.ModelSerializer) : 
#     class Meta: 
#         model = Claimed
#         fields = '__all__'