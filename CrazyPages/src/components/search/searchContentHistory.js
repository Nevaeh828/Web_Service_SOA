import React, { Component } from 'react'
import { Layout, List, PageHeader } from 'antd';
import axios from 'axios'
axios.defaults.baseURL = '/api'

export default class SearchContentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
          keyword: window.location.hash.slice(15),
          myData:{
            code:'',
            month:'',
            day:'',
            data:[]
        }
      }
    }

    componentDidMount(){
        axios
        .get('/history')
        .then((res) => {
        console.log('res1:', res.data)
        var result=res.data
        this.setState({myData:result})
        })
        .catch(function (error) {
        console.log(error)
        })
       console.log(this.state.myData)
    } 
    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
  }
  
  
    render() {
        //初始化render数组状态
        let objArr=this.state.myData
        return(
          <Layout>
            
            <PageHeader
              className="site-page-header"
              ghost={false}
              title="我打赌你不知道……"
              subTitle="历史上的今天发生了这些事！"
            />

            <List
                itemLayout="horizontal"
                dataSource={objArr.data}
                style={{ marginLeft: '20px', marginTop: '5px' }}
                split={true}
                grid={{ column:'2', gutter: '2px'}}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta

                    title={
                      <a href={item.link}>
                        {item.title}
                      </a>
                    }
                    //昵称
                    description={'公元'+item.year+'年'+this.state.myData.month+'月'+this.state.myData.day+'日'}
                    //账号
                    />
                </List.Item>
                )}
            />            
          </Layout>
        )
  }
}