import React, { Component } from 'react'
import { Layout, List, PageHeader, Divider } from 'antd';
import axios from 'axios'
axios.defaults.baseURL = '/api'

export default class SearchContentNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
          keyword: window.location.hash.slice(15),
          data:{
            error_code:0,
            reason:'',
            result:[
                {
                    title:'',
                    content:'',
                    img_width:'',
                    full_title:'',
                    pdate:'',
                    src:'',
                    img_length:'',
                    img:'',
                    url:'',
                    pdate_src:''
                }
            ],
          }
        };
      }

    componentDidMount(){
        var url = '/news?kw=' + this.state.keyword
        axios
        .get(url)
        .then((res) => {
        console.log('res4:', res.data)
        var jsonObj=xmlStrToJsonObj(res.data)
        var myData=jsonObj.response.lives.live
        console.log('myData(JSON):', myData)
        this.setState({data:myData})
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
        let objArr=this.state.data.result
        return(
        <Layout>
                <PageHeader
                  className="site-page-header"
                  ghost={false}
                  title="其次我家事国事天下事皆知，要问这个？"
                  subTitle="都是正经新闻"
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
                    <a href={item.url}>
                        {item.title}
                    </a>
                    }
                    //昵称
                    description={"新闻来源："+item.src+" 发布时间："+item.pdate_src+" "+item.pdate}
                    //账号
                    />
                    <p>{item.content}</p>
                    <Divider />
                </List.Item>
                )}
            />            
        </Layout>
        )
  
  }
}

// 调用函数将XML转换为JSON
function xmlStrToJsonObj(xmlStr) {
    var xmlObj = xmlStrToXmlObj(xmlStr)
    var jsonObj = {}
    if (xmlObj.childNodes.length > 0) {
        jsonObj = xmlObjToJsonObj(xmlObj.childNodes)
    }
    return jsonObj
}

function xmlStrToXmlObj(xmlStr) {
    var xmlObj = {}
    if (document.all) {
        var xmlDom = new window.ActiveXObject("Microsoft.XMLDOM")
        xmlDom.loadXML(xmlStr)
        xmlObj = xmlDom
    } else {
        xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml")
    }
    return xmlObj
}

function xmlObjToJsonObj(xmlNodes) {
    var obj = {}
    // eslint-disable-next-line
    if (xmlNodes.length == 0) {
        obj = ''
    } 
    else if ( xmlNodes === 'error_code'){
        obj = 0
    }
    else {
        for (var i = 0; i < xmlNodes.length; i++) {
            // eslint-disable-next-line
            var node = xmlNodes[i]// eslint-disable-next-line
            if (typeof node.tagName == "undefined" || node.nodeName == "#text") {
                obj = node.nodeValue
            } else {
                var key = node.tagName
                var value = xmlObjToJsonObj(node.childNodes)
                obj[key] = value
            }
        }
    }
    return obj
}