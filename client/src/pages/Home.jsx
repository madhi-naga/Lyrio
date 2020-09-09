import React, { Component } from 'react'
import '../App.css'
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';

export class Home extends Component {

    render() {
        return (
            <div id="grad">
                <div class='login-box' style={homeStyle} >
                    <h1>Welcome to Lyrio</h1>
                    <h2>Login with Spotify to get started</h2>
                    <a className="button" href={login} > LOGIN </a>
                </div>
            </div>
        )
    }
}

const homeStyle = { 
    //backgroundColor: '#cc55aa',
    textAlign:'center',
    overflow: 'auto'
}


export default Home
