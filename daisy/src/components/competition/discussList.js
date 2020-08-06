import React, { Component } from 'react'
import { List, Avatar ,Space,Button, Pagination, Col, Row} from 'antd';
import 'antd/dist/antd.css';
import CollectionsPageReport from '../../components/comm/report'

const data = [
    {
      username: 'zhangsan',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      username: 'lisi',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'kuanye',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'maoge',
      description:'zzzzzz我睡着了 但是我没有摸鱼'
    },
    {
      username: 'zhangsan',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      username: 'lisi',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'kuanye',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'maoge',
      description:'zzzzzz我睡着了 但是我没有摸鱼'
    },
    {
      username: 'zhangsan',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      username: 'lisi',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'kuanye',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'maoge',
      description:'zzzzzz我睡着了 但是我没有摸鱼'
    },
    {
      username: 'zhangsan',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      username: 'lisi',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'kuanye',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'maoge',
      description:'zzzzzz我睡着了 但是我没有摸鱼'
    },
    {
      username: 'zhangsan',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'
    },
    {
      username: 'lisi',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'kuanye',
      description:'Ant Design, a design language for background applications, is refined by Ant UED Team'

    },
    {
      username: 'maoge',
      description:'zzzzzz我睡着了 但是我没有摸鱼'
    },
  ];


export default class DiscussList extends Component { 
  constructor(props)
  {
    super(props)
    this.state={
      currentData:[],
      total: data.length,
      pageSize: 5,
      pageNumber: parseInt(window.location.hash.slice(-1), 0) || 1 //获取当前页面的hash值，转换为number类型
     }
    
  }

  componentDidMount() {
    this.handleAnchor() //页面刷新时回到刷新前的page
  }
  handleAnchor() {
    this.onPageChange(this.state.pageNumber, this.state.pageSize); //手动调用onPageChange,传入当前页数和每页条数
  }

  onPageChange=(page,pageSize)=>{
    console.log("page:",page);
    this.setState({
      pageNumber: page
    }, () => {
      window.location.hash = `#/compPage/${this.props.compID}/pagenum=${page}`; //设置当前页面的hash值为当前page页数
    })
    this.setState((state)=>{
    for(let i=0;i<state.pageSize;i++){
      state.currentData.pop();
    }
    for(let i=pageSize*(page-1);i<state.total&&i<pageSize*page;i++){
      state.currentData.push(data[i]);
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
                <SortDiscuss/>
                <br/>
                <br/>
                    <List
                        style={{width: '100%', resize: 'none'}}
                        itemLayout="horizontal"
                        dataSource={this.state.currentData}
                        renderItem={item => (
                        <div>
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                  <a href={"#/ReadPost"}>
                                    <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'></Avatar>
                                  </a>
                                }
                                title={<a href="#/ReadPost">{item.username}</a>}
                                description={<p>{item.description}</p>}
                            />     
                        </List.Item>
                        <Row>
                        <Button ghost><p style={{color:'black'}}>点赞</p></Button>
                        <Button ghost><p style={{color:'black'}}>收藏</p></Button>
                        <CollectionsPageReport/>
                        </Row>
                        </div>
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



function SortDiscuss() {
    return (
      <Space>
          <p>sort by:</p>       
        <Button type="primary">time</Button>
        <Button type="primary">like</Button>
        <Button type="primary">Favorites</Button>     
      </Space>
    );
  }
