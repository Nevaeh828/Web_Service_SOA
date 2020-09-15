import React, { Component } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { PlusCircleTwoTone } from '@ant-design/icons'
import axios from 'axios'

export default class SubscriptionButton extends Component {

/*
    postData(){
        axios.post('/api/subscribe',{account:,projectId:this.propos.compID})
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
*/



    render() {
        return (
            <div>
               <Button type="primary" icon={<PlusCircleTwoTone />}>订阅</Button>
            </div>
        )
    }
}
