import React, { Component } from 'react'
import Footer from '../../components/Footer'
import SearchContentDream from '../../components/search/searchContentDream'
import LogoBar from '../../components/logoBar'
import SearchContentNews from '../../components/search/searchContentNews'
import SearchContentTransEng from '../../components/search/searchContentTransEng'
import { Row, Col, Layout, PageHeader, Card } from 'antd';

export default class SearchResult extends Component {
    render() {
        return (
            <div >
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="还想搜？"
                    subTitle="好吧那你搜吧"
                />             
                <LogoBar/>
                <Row>
                    <Col span={12} offset={7}>
                        <SearchContentTransEng />
                    </Col>
                </Row>
                <Layout style={{ margin: '2% 8% 5% 8%', backgroundColor: 'white' }}>
                    <Row>
                        <Col span={12}>
                            <Card>
                                <SearchContentNews />                                           
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <SearchContentDream />
                            </Card>
                        </Col>
                    </Row>
                </Layout>
                <Footer/>
            </div>
        )
    }
}