import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import { Form, Radio, Layout } from 'antd';
import { FireOutlined, LikeOutlined, FieldTimeOutlined, CommentOutlined, BellOutlined } from '@ant-design/icons';
import CONSTURL from '../../components/community/config';
import Axios from 'axios';

export default class SearchContentUsr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kw: window.location.hash.slice(25),
      data:[]
    }
  }

  componentDidMount(){
    var url=CONSTURL.local+CONSTURL.searchUser+this.state.kw
    Axios.get(url).then((res)=>{
      var result=res.data
      this.setState({data:result})
      //console.log(this.state.data)
      //console.log(res)
    })
  }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    };

    render() {
        //初始化render数组状态
        let objArr=this.state.data

        return (
          <Layout>
            <List
                itemLayout="horizontal"
                dataSource={objArr}
                style={{ marginLeft: '20px' }}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={
                      <a href={'#/personal/Account='+item.account}>
                        <Avatar src={item.icon}/>
                      </a>
                    }
                    //头像
                    title={
                      <a href={'#/personal/Account='+item.account}>
                        {item.nickname}
                      </a>
                    }
                    //昵称
                    description={item.account}
                    //账号
                    />
                </List.Item>
                )}
            />            
          </Layout>

        );
    }
}