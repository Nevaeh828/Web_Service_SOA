import React, { Component } from 'react'
import { Layout, List, PageHeader, Divider, Empty } from 'antd';
import axios from 'axios'
axios.defaults.baseURL = '/api'


export default class SearchContentDream extends Component {

  constructor(props) {
      super(props);
      this.state = {
        keyword: window.location.hash.slice(15),
        myData:[]
    }
  }

  componentDidMount(){
      var url = '/dream?kw=' + this.state.keyword
      axios
      .get(url)
      .then((res) => {
        console.log('res3:', res.data)
        var result=res.data.result
        this.setState({myData:result})
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
      let objArr=this.state.myData
      if(objArr!==null){
        return(
          <Layout>
              <PageHeader
                  className="site-page-header"
                  ghost={false}
                  title="最后我还熟读《周公解梦》，昨晚梦见这个啦？"
                  subTitle="想不到吧"
              />  
            <List
                itemLayout="vertical"
                dataSource={objArr}
                style={{ margin: '0 20px 0 20px' }}
                split={true}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={'如果你梦到"'+item.title+'"'}
                    description={item.des}
                    />
                    <Divider />
                </List.Item>
                )}
            />            
          </Layout>
        )        
      }
      else return(
        <Layout>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title="最后我还熟读《周公解梦》，昨晚梦见这个啦？"
          subTitle="想不到吧"
      />
        <Empty
            style={{margin: '10px'}}
            description="被你逮到了，我确实不知道"
        >
        </Empty>
        </Layout>
      )
    }
}