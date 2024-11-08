from rest_framework import generics
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Product, Category, Request
from .serializers import ProductSerializer, CategorySerializer, RequestSerializer
from rest_framework.decorators import api_view, permission_classes  # Add this line
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

# List and Create Categories
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Product List/Create View
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(supplier=self.request.user)


# Retrieve, Update, Delete Product
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class RequestZarortMandView(APIView):
    authentication_classes = [JWTAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        product_id = request.data.get('product')
        zarorat_mand_id = request.data.get('zarorat_mand')


        print('request.user ====>', request.user.id)
        print('zarorat_mand_id ====>', zarorat_mand_id)

        
        # Check if the logged-in user is zarorat_mand
        if request.user.id != zarorat_mand_id:
            return Response({"message": "Only the zarorat_mand user can create requests."}, status=403)

        # Fetch the product and check its status
        product = Product.objects.get(id=product_id)
        if product.status != 'available':
            return Response({"message": "This product is not available for request."}, status=400)
        
        # Create request with pending status
        request_data = {
            'product': product_id,
            'zarorat_mand': zarorat_mand_id,
            'request_status': 'pending',
        }
        
        serializer = RequestSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            # Set product status to 'pending'
            product.status = 'pending'
            product.save()
            return Response({"message": "Request created successfully.", "data": serializer.data})
        else:
            return Response(serializer.errors, status=400)
        


class RequestStatusUpdateView(APIView):
    def put(self, request, pk):
        try:
            request_instance = Request.objects.get(pk=pk)
            product = request_instance.product

            print('product ===> ', product.supplier)
            print('request.user ===> ', request.user)


            # Check if the logged-in user is the product creator
            if request.user != product.supplier:  # assuming Product has a 'creator' field
                return Response({"message": "Only the product creator can update request status."}, status=403)

            new_status = request.data.get('request_status')
            if new_status not in ['accepted', 'rejected']:
                return Response({"message": "Invalid status."}, status=400)

            # Update request status and product status accordingly
            request_instance.request_status = new_status
            if new_status == 'accepted':
                product.status = 'claimed'
            elif new_status == 'rejected':
                product.status = 'available'
            
            request_instance.save()
            product.save()
            return Response({"message": "Request status updated successfully.", "data": RequestSerializer(request_instance).data})
        
        except Request.DoesNotExist:
            return Response({"message": "Request not found."}, status=404)


