import { PageHeader,Descriptions } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import '../../style/findTeam/findTeam.css'

export default class teamNav extends Component {

  /*接收比赛名称*/
  constructor(props){
    super(props);
    let matchId=this.props.matchId;
    this.state={
      matchName:'',
      matchIntroduction:''
    }
    axios.get('http://mock-api.com/5g7AeqKe.mock/matchInfo/'+matchId)
    .then(response=>{
    this.setState({
      matchName:response.data[0].Name,
      matchIntroduction:response.data[0].Introduction
    })
  })
  .catch(error=>{
    this.setState({
      matchName:'未找到该比赛',
      matchIntroduction:'未找到该比赛'
    })
    console.log(error);
  })
}

render() {
    return (
    <>
      <div id="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title={this.state.matchName}
        >
          <Descriptions size="small">
            <Descriptions.Item label="比赛简介">{this.state.matchIntroduction}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
      </>
    )
  }
}