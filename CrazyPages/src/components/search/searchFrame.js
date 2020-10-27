import React, { Component } from 'react'
import { Input, Layout } from 'antd';

const { Search } = Input;

export default class SearchFrame extends Component {

    constructor(props) {
        
        super(props)
        this.state = {
          kw: this.props.kw
        }

    }

    inputChange(e){
        this.setState({
          kw: e.target.value
        })
        console.log(this.state.kw)
    }

    keyDown(e){
        if(e.keyCode === 13){
        }
    }

    searchJump(value){
        console.log(this.state.kw)
        window.location.hash=`#/searchResult/${this.state.kw}`
    }

    render() {

        return (
            <div style={{ marginLeft: '25%', backgroundColor: 'white' }}>
                <Layout style={{ backgroundColor: 'white' }}>
                    <Search
                        placeholder="这是一个无聊的网站，不要在这里搜索任何东西！"                  
                        style={{ width: '65%'}}
                        enterButton="Search"
                        size="large"

                        value={this.state.kw}
                        onSearch={value => this.searchJump(value)}
                        //onKeyDown={e=>this.keyDown(e)}
                        onChange={this.inputChange.bind(this)}
                    />                    
                </Layout>

            </div>
        )
    }
}