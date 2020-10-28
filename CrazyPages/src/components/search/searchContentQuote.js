import React, { Component } from 'react'
import { Layout, Empty, PageHeader, Divider, List } from 'antd';
import axios from 'axios'
axios.defaults.baseURL = '/api'

var total

export default class SearchContentQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
          keyword: window.location.hash.slice(15),
          dddata:[]
        };
      }

    componentDidMount(){
        var url = '/quote?kw=' + this.state.keyword
        axios
        .get(url)
        .then((res) => {
        console.log('res4:', res.data)
        var xmlParser = new XmlToJson();
        var myData = xmlParser.parse(res.data);
        console.log('myData(JSON):', myData)
        console.log(myData.items[3].items)
        console.log(myData.items[2].text)
        total = myData.items[2].text

        this.setState({dddata: myData.items[3].items}, ()=> console.log(this.state.dddata))
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
        let objArr=this.state.dddata

        if(total === 0){
            return(
                <Layout>
                        <PageHeader
                        className="site-page-header"
                        ghost={false}
                        title="其次我中外古今名人名言皆知，这个相关的？"
                        subTitle="都不在话下"
                    />
                        <Empty
                            style={{margin: '10px'}}
                            description="被你逮到了，我确实不知道"
                        >
                        </Empty>   
                </Layout>             
            )
        }
        else return(
            <Layout>
                <PageHeader
                className="site-page-header"
                ghost={false}
                title="其次我中外古今名人名言皆知，这个相关的？"
                subTitle="都不在话下"
            />
               <List
                itemLayout="vertical"
                dataSource={objArr}
                style={{ margin: '0 20px 0 20px' }}
                split={true}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={
                        item.items[0].text+"说："
                    }
                    //名人
                    description={item.items[1].text}
                    //名人名言内容
                    />
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