import HeaderNav from '../../components/comm/HeaderNav'
import TeamNav from '../../components/findTeammate/TeamNav'
import Footer from '../../components/comm/Footer'
import React, { Component } from 'react'
import '../../style/findTeam/findTeam.css'
import { Divider} from 'antd';
import Post from '../../components/findTeammate/Post'
import FloatHelper from '../../components/comm/FloatHelper'
import '../../style/comm/comm.css'
import 'antd/dist/antd.css';


export default class PostPage extends Component {

    constructor(props){
        super(props)
        let projctId=0;
        let groupId=0;
        if(this.props.match.params.ProjctId!=null){
            projctId=this.props.match.params.ProjctId;
        }
        if(this.props.match.params.groupId!=null){
            groupId=this.props.match.params.groupId
        }
        this.state={
            ProjctId:projctId,
            GroupId:groupId
        }
      }

    render() {
        return (
            <div>
                <HeaderNav/>
                <br/><br/>
                <TeamNav matchId={this.state.ProjctId}/>
                <div id='page'>
                <Divider/>
                <div id='WebPage'>
                <div>
                    <Post matchId={this.state.ProjctId} groupId={this.state.GroupId} />
                </div>
                <Divider/>
                <FloatHelper/>
                </div>
                <Footer/>
                </div>
            </div>
        )
    }
}
