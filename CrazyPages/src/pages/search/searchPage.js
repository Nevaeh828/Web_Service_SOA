import React, { Component } from 'react'
import { Layout } from 'antd'
import SearchFrame from '../../components/search/searchFrame'
import LogoBar from '../../components/logoBar'
import Footer from '../../components/Footer'
import SearchContentHistory from '../../components/search/searchContentHistory'

export default class SearchPage extends Component {
    render() {
        return (
            <div >

                <LogoBar/>

                <SearchFrame/>

                <Layout style={{ margin: '5% 8% 5% 8%' }}>
                    <SearchContentHistory/>
                </Layout>

                <Footer/>
                
            </div>
        )
    }
}