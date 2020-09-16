import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Card,Avatar,Space,Button,Input} from 'antd';
import '../../style/comm/comm.css'
import PostPageReport from '../findTeammate/report'
import { Divider} from 'antd';
import moment from 'moment'
import axios from 'axios'

const { TextArea } = Input;

const Editor = ({onChange}) => (
    <>
        <TextArea rows={5} onChange={onChange} style={{width: '100%', resize: 'none'}} placeholder="填写入队申请"/>
    </>
  );

export default class Post extends Component {
    
    constructor(props){
        super(props)

        var groupId=this.props.groupId
        var MatchId=this.props.matchId
        var postId=this.props.postId
        
        this.state={
            NickName:"",
            Icon:"strange",
            Content:"",
            PostTime:"",
            Apply:'',
            Account:'',
            GroupId:groupId,
            PostId:postId,
        }
        
        axios.get('http://mock-api.com/5g7AeqKe.mock/Post/1?projectId='+MatchId+'&groupId='+groupId)
        .then(response=>{
            this.setState({
                ProjctId:MatchId,
                NickName:response.data.NickName,
                Content:response.data.Content,
                PostTime:response.data.PostTime,
                Account:response.data.LeaderAccount
            })
            if(response.data.Icon!=null){
                this.setState({
                    Icon:response.data.Icon
                })
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    ContentChange = e => {
        this.setState({
          Apply:e.target.value
        })
      };
    
    render() {
        return (
            <div className='site-card-border-less-wrapper'>
                <Card    
                    extra={//之后可以用button之类的包装一下做成超链接
                        //这里的头像要动态生成
                        <div align="right">

                        <a href={"#/personal"}>
                            <Avatar src={require("../../img/avatar/"+this.state.Icon+".jpg")}></Avatar>
                        </a>
                        <br/>                
                        <a href={"#/personal"}>{this.state.NickName}</a>
                        <PostPageReport 
                        ReportUID={this.state.PostId} 
                        ReporterUID='test2' 
                        Time={moment().format("YYYY-MM-DDTHH:mm:ssC")}
                        />
                        </div>
                        }
                >

                {
                    //下面是帖子的内容部分
                }
                <p>
                   { this.state.Content}
                </p>
                <p id="date">
                    {this.state.PostTime}
                </p>
                </Card>
                <br/>
                <Space>
                    <Button ghost><p style={{color:'black',margin: '0 8px'}}>收藏该帖</p></Button>
                    <Button ghost><p style={{color:'black',margin: '0 8px'}} onClick={()=>{
                        if(this.state.Apply.length>0&&this.state.Account!=null){
                            let dataSent={
                              ProjctId:this.state.ProjctId,
                              Account:this.state.Account,
                              Content:this.state.Apply,
                              GroupId:this.state.GroupId
                            }
                            axios.post('http://mock-api.com/5g7AeqKe.mock/Application',dataSent)
                            .then(response=>{
                              console.log(response)
                              window.alert("申请成功")
                            })      
                    }
                    else{
                        window.alert("申请失败")
                    }
                    }}>申请进入小队</p></Button>
                </Space>
                <Divider/>
                <Editor onChange={this.ContentChange}/>
            </div>
        )
    }
}
