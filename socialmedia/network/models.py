from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class User(AbstractUser):
    pass
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    profileSet = models.BooleanField(default=False)
class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userFollowing")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
class Followers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userFollowed")
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower")
class Publish(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userPublish")
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
   
    def liked(self,user):
        return Like.objects.filter(user=user, publishliked=self).exists()
    def get_profile_image(self):
        profile = Profile.objects.filter(user=self.user).first()
        if profile:
            return profile.image.url
        return None

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userLiked")
    publishliked = models.ForeignKey(Publish, on_delete=models.CASCADE, related_name="publishLiked")