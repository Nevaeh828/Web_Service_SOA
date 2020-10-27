from flask import Flask, request, json
import requests, json

from flask_cors import CORS

app = Flask(__name__)

# r'/*' 是通配符，让本服务器所有的URL 都允许跨域请求
CORS(app, resources=r'/*')


# 历史上的今天
@app.route('/api/history', methods=['GET'])  # 装饰器
def history():
    url = 'https://api.asilu.com/today/'
    data = requests.get(url)
    data.encoding = 'utf-8'
    return data.text


# 时事新闻搜索
@app.route('/api/news', methods=['GET'])
def news():
    keyword = request.values.get('kw') # 例：http://127.0.0.1:5000/api/news?kw=奥巴马
    url = 'http://api.avatardata.cn/ActNews/Query'
    key = 'a119e90b1a1a4087ac24157b8c25755a'
    dtype = 'XML'
    dict = {'key': key, 'dtype': dtype, 'keyword': keyword}
    res = requests.get(url, dict)  # 这个调用第三方接口的方法，第二个参数是字典/字节流
    # type(res.text)是str
    return res.text


# 周公解梦
@app.route('/api/dream', methods=['GET'])
def dream():
    keyword = request.values.get('kw') # 例：http://127.0.0.1:5000/api/dream?kw=黄金
    url = 'http://v.juhe.cn/dream/query'
    key = 'c5179ebd54f625613902bc6660d4b1b5'
    dict = {'key': key, 'q': keyword}
    res = requests.post(url, dict)
    res.encoding = 'utf-8'
    # type(res.text)是str
    return res.text


if __name__ == '__main__':
    app.run(debug=True)
