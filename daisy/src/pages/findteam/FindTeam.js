import React, { Component } from 'react'
import HeaderNav from '../../components/comm/HeaderNav'
import TeamNav from '../../components/findTeammate/TeamNav'
import PublishPost from '../../components/findTeammate/PublishPost'
import Footer from '../../components/comm/Footer'
import { Divider } from 'antd';
import PostList from '../../components/findTeammate/ViewPost'
import FloatHelper from '../../components/comm/FloatHelper'
import '../../style/findTeam/findTeam.css'

export default class FindTeam extends Component {
    constructor(props){//接收比赛页面传递的比赛数据
        super(props)
  
        this.state={
          matchId:1
         }
      }
    render() {
        return (
            <>
                <HeaderNav/>
                <br/><br/>
                <TeamNav matchId={this.state.matchId}/>
                <div id='page'>
                <Divider/>
                <div id='WebPage'>
                    <div id='PostList'>
                        <PostList/>
                    </div>
                    <br/>
                    <Divider/>
                    <div id='PublishPost'><PublishPost matchId={this.state.matchId}/></div>
                    <br/>
                    </div>
                <FloatHelper/>
                </div>
                <Footer/>
            </>
        )
    }
}
