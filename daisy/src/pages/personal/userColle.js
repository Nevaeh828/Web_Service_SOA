import React, { Component } from 'react'
import {Card,Button,Modal,Form,Input,Select,Popconfirm,Popover,List} from 'antd'
import {LockOutlined,LockFilled,DeleteOutlined,PlusCircleOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const {Meta}=Card

export default class UserColle extends Component {
    constructor(props){
        super(props)
        this.deleteFile.bind(this)
        this.changePrivacy.bind(this)
        this.state={
            data:[],
            account:this.props.match.params.account
        }
        Axios.get('/FavouritePakcage/'+this.state.account,{headers: { "Authorization": 'Bearer ' +token }})
        .then((res)=>{
            this.setState(
                {
                    data:res.data
                }
            )
        })
        .catch(function(error){
            console.log(error)
         })
    }
    changePrivacy(fileID){
        let fdata=[...this.state.data]
        for(let i=0;i<fdata.length;i++){
            if(fdata[i].fileID==fileID){
                fdata[i].private=!fdata[i].private
            }
        }
        this.setState({
            data:fdata
        })
    }
    deleteFile(fileID){
        let fdata=[...this.state.data]
        for(let i=0;i<fdata.length;i++){
            if(fdata[i].fileID==fileID){
                fdata.splice(i,1)
            }
        }
        this.setState({
            data:fdata
        })
    }
    
    
    render() {
        return (
            <div>
                <Link to={{pathname:'/newColle',state:this.props.account}}>
                    <Button
                    type="text" 
                    size='large'
                    icon={<PlusCircleOutlined/>}
                    style={{margin:20}}
                    >
                        新建收藏夹
                    </Button>
                </Link>
                

                <List
                style={{margin:20}}
                grid={{ gutter: 20, column: 3 }}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <Card
                        actions={[
                                <Popover content='更改收藏夹隐私状态'>
                                    <Button 
                                    type="text" 
                                    size='small'
                                    icon={item.private?<LockFilled style={{color:'#1890ff'}}/>:<LockOutlined style={{color:'#1890ff'}}/>}
                                    onClick={()=>this.changePrivacy(item.fileID)}
                                    />
                                </Popover>,
                                <Popconfirm 
                                title='要删除收藏夹吗？'
                                onConfirm={()=>this.deleteFile(item.fileID)}
                                okText="确定"
                                cancelText="取消"
                                >
                                    <Button 
                                    type="text" 
                                    size='small'
                                    icon={<DeleteOutlined style={{color:'#ff0000'}}/>}
                                    />
                                </Popconfirm>
                        ]}
                        >
                            <Meta
                            title={<a href={"#/collection/"+item.fileID}>{item.filename}</a>}
                            description={item.type+' file'}
                            />
                        </Card>
                    </List.Item>
                )}
                />
            </div>
        )
    }
    handleChangePage(fileID)
    {
      this.context.router.push(
        {
          path:'#/collection/'+fileID,
          ID:fileID
        }
      )
    }
}
