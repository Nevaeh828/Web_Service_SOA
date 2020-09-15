//
// made by ykn
//
import React, { Component } from 'react'
import { List, Avatar,Col, Pagination,Space,Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import CONSTURL from './config'
import Axios from 'axios';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


export default class MomentList extends Component {
    constructor(props){
        super(props)
    

      var sourceData = [
        {
          Uid:110,
          Pid:1,
          avatarSrc:'boss',
          title: '我最讨厌汇编了',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
        },
        {
          Uid:110,
          Pid:2,
          avatarSrc:'boss',
          title: 'Ant Design Title 2',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:3,
          avatarSrc:'boss',
          title: 'Ant Design Title 3',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:4,
          avatarSrc:'boss',
          title: 'Ant Design Title 4',
          description:'zzzzzz我睡着了 但是我没有摸鱼'
        },
        {
          Uid:110,
          Pid:1,
          avatarSrc:'boss',
          title: '当然c也很讨厌',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
        },
        {
          Uid:110,
          Pid:2,
          avatarSrc:'boss',
          title: 'Ant Design Title 2',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:3,
          avatarSrc:'boss',
          title: '总而言之要写课设的就讨厌',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:4,
          avatarSrc:'boss',
          title: 'Ant Design Title 4',
          description:'zzzzzz我睡着了 但是我没有摸鱼'
        },
        {
          Uid:110,
          Pid:1,
          avatarSrc:'boss',
          title: 'Ant Design Title 1',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
        },
        {
          Uid:110,
          Pid:2,
          avatarSrc:'boss',
          title: 'Ant Design Title 2',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:3,
          avatarSrc:'boss',
          title: 'Ant Design Title 3',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:4,
          avatarSrc:'boss',
          title: 'Ant Design Title 4',
          description:'zzzzzz我睡着了 但是我没有摸鱼'
        },
        {
          Uid:110,
          Pid:1,
          avatarSrc:'boss',
          title: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
        },
        {
          Uid:110,
          Pid:2,
          avatarSrc:'boss',
          title: '不是 就 你一定要喊吗？',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:3,
          avatarSrc:'boss',
          title: '。。。。',
          description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

        },
        {
          Uid:110,
          Pid:4,
          avatarSrc:'boss',
          title: 'Ant Design Title 4',
          description:'zzzzzz我睡着了 但是我没有摸鱼'
        },
      ];
        this.state={
          data:sourceData,
          sortType:'time',
          currentData:[],
          total:10,//这里的total也是要获取的数据
          pageSize: 10,
          pageNumber:parseInt(window.location.hash.slice(-1), 0) || 1 //获取当前页面的hash值，转换为number类型

        }
    }

    componentDidMount() {
      this.getMomentList()
    }

    getMomentList(){
      var url=CONSTURL.hosturl+CONSTURL.GetMomentList+this.state.sortType
      Axios.get(url).then((res)=>{
        this.setState({data:res.data})
        this.setState({total:res.data.length})
        console.log(this.state)
        //数据读取完成之后更新页面
        this.handleAnchor()
      })
    }

    sortByTime(){
      this.setState({sortType:'time'})
      this.getMomentList()
    }

    sortByLike(){
      this.setState({sortType:'like'})
      this.getMomentList()
    }

    sortByComments(){
      this.setState({sortType:'comment'})
      this.getMomentList()
    }

    sortByFavorites(){
      this.setState({sortType:'star'})
      this.getMomentList()  
    }
        
      

    handleAnchor() {
      this.onPageChange(this.state.pageNumber, this.state.pageSize); //手动调用onPageChange,传入当前页数和每页条数
    }
    
    onPageChange=(page,pageSize)=>{
//      console.log("page:",page);
      this.setState({
        pageNumber: page
      }, () => {
        window.location.hash = `#/Community/pagenum=${page}`; //设置当前页面的hash值为当前page页数
      })
      this.setState((state)=>{
      for(let i=0;i<state.pageSize;i++){
        state.currentData.pop()
      }
      for(let i=pageSize*(page-1);i<state.total&&i<pageSize*page;i++){
  //      console.log(i)
        state.currentData.push(this.state.data[i])
      }
        return{
          currentData:state.currentData,
        }
      }
     );
   }



    render() {
        return (
            <div>
                  <Space>
                    <p>sort by:</p>       
                    <Button type="primary" onClick={this.sortByTime.bind(this)}>time</Button>
                    <Button type="primary" onClick={this.sortByLike.bind(this)}>like</Button>
                    <Button type="primary" onClick={this.sortByComments.bind(this)}>comments</Button>
                    <Button type="primary" onClick={this.sortByFavorites.bind(this)}>Favorites</Button>     
                  </Space>
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.currentData}
                    renderItem={item => (
                      <List.Item
                          key={item.Title}
                          actions={[
                                    <IconText icon={StarOutlined} text={item.StarNum} key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text={item.LikeNum} key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text={item.CommentNum} key="list-vertical-message" />,
                                  ]}
                                  >
                          <List.Item.Meta
                            avatar={

                              //头像的来源和指向的地址
                              <a href={"#/Moment/"+item.Account}>
                                <Avatar src={require("../../img/avatar/"+item.icon+".jpg")}></Avatar>
                              </a>
                            }

                            //帖子的名字和指向的地址，传一个pid，moment_id
                              title={<a href ={"#/Moment/"+item.MomentId}>{item.Title}</a>}

                              description={<p>{item.Content}</p>}
                              
                          />

                      </List.Item>
                    )}
                  />
                  <Col offset={9}>
                    <Pagination 
                      showQuickJumper 
                      current={this.state.pageNumber}
                      defaultPageSize={this.state.pageSize} 
                      total={this.state.total}
                      onChange={this.onPageChange} 
                    />
                  </Col>
            </div>
        )
    }
}

