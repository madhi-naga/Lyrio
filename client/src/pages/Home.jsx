import React, { Component } from 'react'
import '../App.css'
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';

export class Home extends Component {

    render() {
        return (
            <div style={homeStyle}>
                <h1>Welcome to Lyrio</h1>
                <h3>Login with Spotify to get started</h3>
                <a className="button" href={login} > LOGIN </a>
            </div>
        )
    }
}

const homeStyle = { 
    backgroundColor: '#fff',
    textAlign:'center'
}

export default Home
