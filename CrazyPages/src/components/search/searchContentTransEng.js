import React, { Component } from 'react'
import {  Layout, PageHeader } from 'antd';
import Axios from 'axios'

export default class SearchContentTransEng extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyword: window.location.hash.slice(15),
          data:[]
        };
      }
    componentDidMount(){
        Axios
        .get(`https://api.66mz8.com/api/translation.php?info=`+this.state.keyword)
        .then((res) => {
        console.log('res2:', res.data)
        var result=res.data
        this.setState({data:result})
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
              title={"首先我知道你搜索的意思是\""+objArr.fanyi+"\""}
              subTitle="我英语比你强多了（狗头）"
            />
        </Layout>
        )
  }
}