#! /usr/bin/env python  
#coding:utf-8

import requests

loginUrl = "https://test-accounts.mobtest.com/authorize?response_type=code&redirect_uri=http%3A%2F%2Fcrm.mobtest.com%2Fcrm%2Fuser%2Fuser%2Fcallback&state=1&client_id=1020"
loginParams = {"username":"shun.yao@mobtest.com","password":"xxxx"}

#首次访问 获取页面回话cookie
r = requests.request('get',loginUrl)
print r.status_code
print r.cookies

#登录 获取跳转url
s = requests.request('post', loginUrl, allow_redirects=False, data=loginParams, cookies = r.cookies)
print s.status_code

location = s.headers['location']
print location


#访问跳转页 获取crm系统cookie
q = requests.request('get', location, allow_redirects=False)
print q.status_code
print q.cookies

crmCookie = q.cookies

#以下可以访问任意接口

#访问info接口 
crmUrl = 'http://crm.mobtest.com/crm/user/user/info'
crmRes = requests.request('get', crmUrl, cookies=crmCookie)
print crmRes.status_code
print crmRes.text 
print '---------------------------------------'

#访问list接口
crmUrl = 'http://crm.mobtest.com/crm/system/message/list'
data = {'pageNum':1, 'pageSize':10}
crmRes = requests.request('get', crmUrl, params=data, cookies=crmCookie)
print crmRes.status_code
print crmRes.text