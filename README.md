# Project Document for CrazyPages

##### Author:  Zheng Hanwen

##### StudentID: 1853931

##### Tutor: Liu Yan

------

## 1. Abstraction

This document is a project document for the assigned individual project for Web Service & SOA course. It's written as an entertainment auxiliary for every single person, especially who surf the Internet a lot. For some objective reasons, the theme of my project has changed after the project proposal submitted. This document aims to draw a brief illustration of CrazyPages and make it easier to learn about its technology stack. This proposal is divided into 5 parts mainly. The first part intoduces the design concept and practicality of CrazyPages, in addition to some operation guides. Then the second part demonstrates the architecture of the project, divided by the front-end and the back-end design. The third lists all the web-apis I've used, demonstrates all the apis that I design and achieve, and explains the integration. The fourth part demonstrates a few screenshots of my project. The last part instructs readers to set up environment and precondition in order to run the whole project.



## 2. Brief Introduction

CrazyPages is a product made by a crazy programmer( yey, that's me), to provide precious  entertainment for high-speed living people and high-pressurers. I try my best to make the front-end pages cute and active. They may make you smile and also learn some interesting facts. Hope my project bring you a good day!



## 3. Architecture

### 3.1 Front-end

#### 3.1.1 Introduction

My front-end part is based on a react scaffolding. React basically helps to distribute task into lower levels and realize easier data fetching and access. The structure is listed as below.

<img src="/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/F007A110-D22A-4B31-91BE-4C319597F947.png" alt="F007A110-D22A-4B31-91BE-4C319597F947" style="zoom:33%;" />

#### 3.1.2 Structure

- node_modules: dependency file, fine to be added into git.ignore
- public: openly access files
- src: edit your 90% codes here
- index.js => load some global scripts and start a react app
- **component** => including views and logical controller of the elements of frontend web pages
- pages:  including more direct rendering  of pages
- **routes** => **index.js** ==> package React routes to jump to a certain path and define mine
- craco.config.js => realize the global configuration of UI component library such as change theme color
- setupProxy.js => import http-proxy-middleware and set up my Proxy agent

#### 3.1.3 Most Used Libraries

1. ant-design UI
2. axios
3. proxy
4. jquery

#### 3.1.4 Essential Code Pics

![EE81BE5CCE9BF91735B27B2ABE7852D8](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/EE81BE5CCE9BF91735B27B2ABE7852D8.png)

pic1: set routes

![2EA2176D-D067-457A-9E3C-022C63830029](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/2EA2176D-D067-457A-9E3C-022C63830029.png)

pic2: SearchResult Component design

![3354EA9D8D955F65F9F145B60FADB24E](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/3354EA9D8D955F65F9F145B60FADB24E.png)

pic3: SearchPage Component design

<img src="/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/3F6113171149191BAB04341B26135F30.png" alt="3F6113171149191BAB04341B26135F30" style="zoom: 33%;" />

<img src="/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/9F76BE3DF9947A6CC66DC3DB54854281.png" alt="9F76BE3DF9947A6CC66DC3DB54854281" style="zoom:33%;" />

pic4-5: SearchFrame Component design

![8C1E9254B00D1732194ADE47ABF6B13E](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/8C1E9254B00D1732194ADE47ABF6B13E.png)

pic6: SearchContentTransEng Component design, including fetch data through web-api by the way of URL

<img src="/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/36692F0C64916CE67FCDE23A8E003822.png" alt="36692F0C64916CE67FCDE23A8E003822" style="zoom:33%;" />

<img src="/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/B583B1AF78EF9F3683500192AD310EB8.png" alt="B583B1AF78EF9F3683500192AD310EB8" style="zoom:33%;" />

pic7-8: SearchContentHistory Component design, including fetch data through my api by agent name

![E69B235C-1014-4435-8260-668C24E67525](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/E69B235C-1014-4435-8260-668C24E67525.png)

![7715365B-4485-4AFA-940A-7BA12FFF58FF](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/7715365B-4485-4AFA-940A-7BA12FFF58FF.png)

pic9-10: SearchContentDream Component design, featuring fault-tolerance assurance with renderung empty status



Below is my XmlToJson function:

```javascript
// 调用函数将XML转换为JSON
function XmlToJson() {
}
XmlToJson.prototype.setXml = function(xml) {
    if(xml && typeof xml == "string") {
        this.xml = document.createElement("div");
        this.xml.innerHTML = xml;
        this.xml = this.xml.getElementsByTagName("*")[0];
    }
    else if(typeof xml == "object"){
        this.xml = xml;
    }
};
XmlToJson.prototype.getXml = function() {
    return this.xml;
};
XmlToJson.prototype.parse = function(xml) {
    this.setXml(xml);
    return this.convert(this.xml);
};
XmlToJson.prototype.convert = function(xml) {
    if (xml.nodeType !== 1) {
        return null;
    }
    var obj = {};
    obj.xtype = xml.nodeName.toLowerCase();
    var nodeValue = (xml.textContent || "").replace(/(\r|\n)/g, "").replace(/^\s+|\s+$/g, "");
    if(nodeValue && xml.childNodes.length === 1) {
      obj.text = nodeValue;
    }
    if (xml.attributes.length > 0) {
        for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj[attribute.nodeName] = attribute.nodeValue;
        }
    }
    if (xml.childNodes.length > 0) {
        var items = [];
        for(var i = 0; i < xml.childNodes.length; i++) {
            var node = xml.childNodes.item(i);
            var item = this.convert(node);
            if(item) {
                items.push(item);
            }
        }
        if(items.length > 0) {
            obj.items = items;
        }
    }
    return obj;
};
```



### 3.2 Back-end

#### 3.2.1 Introduction

My back-end part is based on Python Flask. I've learned how to use Flask to finish enough requirements for my project just for one night and finally realize everything necessary. Python Flask is agile, efficient and practical. And it's so suitable for this assignment. The structure is listed as below.

#### 3.2.2 Structure

in main.py, you will first find dependencies imported such as flask, flask_cors (to solve CORS problems), requests. 

```python
# r'/*' 是通配符，让本服务器所有的URL 都允许跨域请求
CORS(app, resources=r'/*')
```

Above allows all URLs on this server to allow cross-domain requests.

Then I bind functions to a route and define the methods of data requsting. If there need to be some parameters I use request.value.get(), then pass on to call for web-apis and return data after encoding (to controll the format). And if there is key needed for a certain web-api (the key should be acquired by myself from their platform), I will wrap the api fine and cut the number of parameters to keep it easy.

```python
if __name__ == '__main__':
    app.run(debug=True)
```

Finally app.run. Keep the back-end server working and then test all my api at the front-end. They all work out.

#### 3.2.3 Essential Code Pics

![7C03E61B-1644-4109-AFB5-DBC3A3E0C6DD](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/7C03E61B-1644-4109-AFB5-DBC3A3E0C6DD.png)

![2AB38E95D5E5AD521C5C8DEB306B8B9F](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Caches/Images/2AB38E95D5E5AD521C5C8DEB306B8B9F.png)



## 4. Apis and Intergration

### 4.1 All of the web-apis I used

| src        | BaseURL                                                      | Data Format | Note         |
| ---------- | ------------------------------------------------------------ | ----------- | ------------ |
| 简爱API    | [https://api.asilu.com/today](javascript:copytext('hrefcopy',0);) | json        | 历史上的今天 |
| 阿凡达数据 | http://api.avatardata.cn/MingRenMingYan/LookUp               | xml         | 名人名言查询 |
| Kate·API   | https://api.66mz8.com/api/translation.php                    | json        | 中英互译     |
| 聚合数据   | http://ip.taobao.com/service/                                | json        | 周公解梦查询 |

### 4.2 My Apis

| Method | Api           | Note                                                         |
| ------ | ------------- | ------------------------------------------------------------ |
| GET    | /api/history  | Get today's history affairs.                                 |
| GET    | /api/quote?kw | Get the relevant famous sayings list searched by a certain keyword. |
| GET    | /api/dream?kw | Get the detaied dream analysis list searched by a certain keyword. |

### 4.3 Intergration

#### Back-end:

```python
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
```

#### Front-end:

```jsx
      var url = '/dream?kw=' + this.state.keyword
	      axios.get(url).then((res) => {
        	console.log('res3:', res.data)
        	var result=res.data.result
        	this.setState({myData:result})
      })
```

```jsx
    render() {
      //初始化render数组状态
      let objArr=this.state.myData
      if(objArr!==null){
        return(
          <Layout>
              <PageHeader
                  className="site-page-header"
                  ghost={false}
                  title="最后我还熟读《周公解梦》，昨晚梦见这个啦？"
                  subTitle="想不到吧"
              />  
            <List
                itemLayout="vertical"
                dataSource={objArr}
                style={{ margin: '0 20px 0 20px' }}
                split={true}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={'如果你梦到"'+item.title+'"'}
                    description={item.des}
                    />
                    <Divider />
                </List.Item>
                )}
            />            
          </Layout>
        )        
      }
      else return(
        <Layout>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title="最后我还熟读《周公解梦》，昨晚梦见这个啦？"
          subTitle="想不到吧"
      />
        <Empty
            style={{margin: '10px'}}
            description="被你逮到了，我确实不知道"
        >
        </Empty>
        </Layout>
      )
    }
```



## 5. Screenshots

![Screenshot1](/Users/apple/Desktop/Screenshot1.png)

![Screenshot2](/Users/apple/Desktop/Screenshot2.png)

![612DEFFB-2F9E-4252-9849-A28DEE90AB7C](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/612DEFFB-2F9E-4252-9849-A28DEE90AB7C.png)

![9DA25028-27E5-458F-BCE7-BCFF71D68EEF](/Users/apple/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/953589050/QQ/Temp.db/9DA25028-27E5-458F-BCE7-BCFF71D68EEF.png)



## 6. Background Setup Instruction

#### Front-end background

```shell
npm -v
yarn -v
node -v
git --version

# antd
npm i antd
yarn add craco-less

# 路由
npm i react-router-dom

# Proxy 代理
yarn add http-proxy-middleware

# 启动
cd Web_Service_SOA
cd CrazyPages
npm start
```

#### Back-end background

```python
pip install flask
pip install requests
pip install flask_cors
......

python flask.py
```





###### By the way, the project has been tracked in my GitHub repository(link below). You can see my follow-up development and improvement.

###### https://github.com/Nevaeh828/Web_Service_SOA