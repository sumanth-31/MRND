from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponseBadRequest,HttpResponse
from databaseAPI.models import Repository,Package
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
# Create your views here.
@csrf_exempt
def addRepView(request):
    if(request.method!='POST'):
        return HttpResponseBadRequest('')
    jsondata=json.loads(request.body)
    repId=jsondata['repid']
    obj=Repository.objects.get_or_create(repid=repId)[0]
    data=serializers.serialize('json',[obj,])
    return HttpResponse(data,content_type='application/json')  
@csrf_exempt  
def addPackageView(request):
    if(request.method!='POST'):
        return HttpResponseBadRequest('')
    jsondata=json.loads(request.body)
    packages=jsondata['packages']
    for package in packages:
        obj=Package.objects.get_or_create(name=package,defaults={'count':0})[0]
        obj.count=obj.count+1
        obj.save()
    return HttpResponse('',content_type='application/json')
@csrf_exempt
def retrieveTopTenView(request):
    if(request.method!='GET'):
        return HttpResponseBadRequest('')
    objects=Package.objects.all().order_by('-count')
    length=len(objects)
    toppackages=objects[:min(length,10)]
    resuldata=[]
    for package in toppackages:
        resuldata.append(package.name)
    return HttpResponse(json.dumps({'packages':resuldata}),content_type='application/json')
@csrf_exempt
def containsView(request):
    if(request.method!='POST'):
        return HttpResponseBadRequest('')
    try:
        jsondata=json.loads(request.body)
        Repository.objects.get(repid=jsondata['repid'])
        return HttpResponse(json.dumps({'contains':True}),content_type='application/json')
    except Repository.DoesNotExist:
        return HttpResponse(json.dumps({'contains':False}),content_type='application/json')
@csrf_exempt
def deleteRepView(request):
    if(request.method!='GET'):
        return HttpResponseBadRequest('')
    Repository.objects.all().delete()
    return HttpResponse('',content_type='application/json')
@csrf_exempt
def deletePackagesView(request):
    if(request.method!='GET'):
        return HttpResponseBadRequest('')
    Package.objects.all().delete()
    return HttpResponse('',content_type='application/json')
index=never_cache(TemplateView.as_view(template_name='index.html'))