from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView

from .models import Post
from .serializers import PostSerializer

# Create your views here.

class PostListCreateView(APIView):

    """
        a view for creating and listing posts
    """

    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # GET ALL POSTS AT /posts/ 'GET'
    def get(self, request:Request, *args, **kwargs):
        posts = Post.objects.all()

        # In this case, the 'instance' is going to be the data that we are returning
        # the 'many' argument will tell the serializer to return a list of data for all of the posts in our database
        serializer=self.serializer_class(instance=posts, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    # ADD A NEW POST AT /posts/ 'POST'
    def post(self, request:Request, *args, **kwargs):
        data = request.data

        print(request.data)

        # self.serializer_class was defined to be PostSerializer at the top of our class view
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Post Created",
                "data": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

        
class PostRetrieveUpdateDeleteView(APIView):

    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request:Request, post_id:int):
        post = get_object_or_404(Post, pk=post_id)

        serializer = self.serializer_class(instance=post)
        permission_classes = [IsAuthenticated]

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request:Request, post_id:int):
        post = get_object_or_404(Post, pk=post_id)

        data = request.data

        serializer = self.serializer_class(instance=post, data=data)

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Post updated",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request:Request, post_id:int):
        post = get_object_or_404(Post, pk=post_id)

        post.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
# @api_view(http_method_names=['GET'])
# def post_detail(request:Request, post_id:int):

#     # returns a 404 error if the object is not found
#     post = get_object_or_404(Post, pk=post_id)

#     serializer = PostSerializer(instance=post)

#     response = {
#         "message":"post",
#         "data": serializer.data
#     }

#     # this will only run if the object has been found
#     return Response(data=response, status=status.HTTP_200_OK)

"""
    CHANGE THIS TO GET USER POSTS
"""

# @api_view(http_method_names=['GET'])
# def post_detail(request:Request, post_id:int):

#     # returns a 404 error if the object is not found
#     post = get_object_or_404(Post, pk=post_id)

#     serializer = PostSerializer(instance=post)

#     response = {
#         "message":"post",
#         "data": serializer.data
#     }

#     # this will only run if the object has been found
#     return Response(data=response, status=status.HTTP_200_OK)