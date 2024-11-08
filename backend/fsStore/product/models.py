from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Product(models.Model):

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('claimed', 'Claimed'),
        ('pending', 'Pending'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    supplier = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, related_name='owned_products')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    is_claimed = models.BooleanField(null=True)

    def __str__(self):
        return self.name

class Request (models.Model) : 

    STATUS_CHOICES = [
        ('accepted', 'accepted'),
        ('rejected', 'rejected'),
        ('pending', 'Pending'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    zarorat_mand = models.ForeignKey('user.User', on_delete=models.CASCADE)
    request_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save the request first

        # Update the product status based on the request status
        if self.request_status == 'accepted':
            self.product.status = 'claimed'
            self.product.is_claimed = True
        elif self.request_status == 'rejected':
            self.product.status = 'available'
            self.product.is_claimed = False
        else:
            self.product.status = 'pending'

        self.product.save()  # Save the product with updated status

    def __str__(self):
        return self.zarorat_mand.username