var request = require('superagent')

var headers1 = {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate, br',
  'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
  'Cache-Control':'max-age=0',
  'Connection':'keep-alive',
  'Content-Length':50,
  'Content-Type':'application/x-www-form-urlencoded',
  'Cookie':'_ga=GA1.2.976403365.1493870079; PHPSESSID=af278dkq727eic3m2gvl6fcke7; qqmail_alias=shun.yao@mobtest.com; _u=mobtest.com',
  'Host':'test-accounts.mobtest.com',
  'Origin':'https://test-accounts.mobtest.com',
  'Referer':'https://test-accounts.mobtest.com/authorize?response_type=code&redirect_uri=http%3A%2F%2Fcrm.mobtest.com%2Fcrm%2Fuser%2Fuser%2Fcallback&state=1&client_id=1020',
  'Upgrade-Insecure-Requests':1,
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
}

var headers2 = {
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding':'gzip, deflate',
  'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
  'Cache-Control':'max-age=0',
  'Cookie':'_ga=GA1.2.976403365.1493870079; lng=zh; qqmail_alias=shun.yao@mobtest.com; auth=',
  'Host':'crm.mobtest.com',
  'Proxy-Connection':'keep-alive',
  'Upgrade-Insecure-Requests':1,
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
}

var headers3 = {
  'Accept':'*/*',
  'Accept-Encoding':'gzip, deflate',
  'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
  'Cookie':'',
  'Host':'crm.mobtest.com',
  'Proxy-Connection':'keep-alive',
  'Referer':'http://crm.mobtest.com/',
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
}


var loginUrl = 'https://test-accounts.mobtest.com/authorize?response_type=code&redirect_uri=http%3A%2F%2Fcrm.mobtest.com%2Fcrm%2Fuser%2Fuser%2Fcallback&state=1&client_id=1020';

function _login () {
  request
    .post(loginUrl)
    .set(headers1)
    .type('form')
    .send({
      username: 'shun.yao@mobtest.com',
      password: 'Aa111111'
    })
    .redirects(0)
    .end(function(err,res){
      var location = res.headers['location'];
      location && _login2(location);
    })
}


function _login2(url){
  request
    .get(url)
    .set(headers2)
    .type('form')
    .send()
    .redirects(0)
    .end(function(err,res){
      var saveCookies = res.headers['set-cookie'].join('');
      saveCookies && getInfo(saveCookies)
    })
}

function getInfo(saveCookies){
  headers3.Cookie = saveCookies;  
  request
    .get('http://crm.mobtest.com/crm/user/user/info')
    .set(headers3)
    .set('Accept', 'application/json')
    .send()
    .redirects(0)
    .end(function(err,res){
      console.log(JSON.stringify(res.body));
    })
}

//启动
_login()

//todo

