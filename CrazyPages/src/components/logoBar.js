import React, { Component } from 'react'
import logo from './searchLogoBar.png'

export default class LogoBar extends Component {
    render() {

        return (
            <div className="logo" style={{marginLeft: '18%', marginBottom: '5%', marginTop: '5%'}}>
                    <img src={logo} width="865" height="101" alt="logo"/>
            </div>
        )
    }
}