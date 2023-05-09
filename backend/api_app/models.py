from django.db import models
from accounts.models import User

# Create your models here.



# class Community(models.Model):
#     pass


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # community = models.ForeignKey(Community, on_delete=models.CASCADE)
    # username

    def __str__(self):
        return f"{self.title}: created {self.created}"
    
class Comment(models.Model):
    content = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # username



