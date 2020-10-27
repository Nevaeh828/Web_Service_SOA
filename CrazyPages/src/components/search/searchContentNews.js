import React, { Component } from 'react'
import { Layout, List, PageHeader, Divider } from 'antd';
import axios from 'axios'
axios.defaults.baseURL = '/api'

export default class SearchContentNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
          keyword: window.location.hash.slice(15),
          data:[]
        };
      }

    componentDidMount(){
        var url = '/news?kw=' + this.state.keyword
        axios
        .get(url)
        .then((res) => {
        console.log('res4:', res.data)
        var xmlParser = new XmlToJson();
        var myData = xmlParser.parse(res.data);
        console.log('myData(JSON):', myData)
        this.setState({data:myData.items[2].items})
        console.log(this.state.data)

        })
        .catch(function (error) {
        console.log(error)
        })
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    
  
    render() {
        //初始化render数组状态
        let objArr=this.state.data
        return(
        <Layout>
                <PageHeader
                  className="site-page-header"
                  ghost={false}
                  title="其次我家事国事天下事皆知，要问这个？"
                  subTitle="都是最新新闻"
              />  
            <List
                itemLayout="vertical"
                dataSource={objArr}
                style={{ margin: '0 20px 0 20px' }}
                split={true}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    /*
                    avatar={
                    <a href={'#/personal/account='+item.account}>
                        <Avatar src={item.icon}/>
                    </a>
                    }
                    //头像
                    */
                    title={
                        item.items[0].text
                    }
                    //昵称
                    description={"新闻来源："+item.items[2].items[2].text+" 发布时间："+item.items[2].items[1].text}
                    //账号
                    />
                    <p>
                        {item.items[1].text}
                    </p>
                    <Divider />
                </List.Item>
                )}
            />            
        </Layout>
        )
  
  }
}

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
    if (xml.nodeType != 1) {
        return null;
    }
    var obj = {};
    obj.xtype = xml.nodeName.toLowerCase();
    var nodeValue = (xml.textContent || "").replace(/(\r|\n)/g, "").replace(/^\s+|\s+$/g, "");
   
    if(nodeValue && xml.childNodes.length == 1) {
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