from django.contrib import admin
from .models import User,Profile,Publish,Followers,Following,Like

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Publish)
admin.site.register(Followers)
admin.site.register(Following)
admin.site.register(Like)