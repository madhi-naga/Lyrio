import React, { Component } from 'react'
import '../App.css'
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';

export class Home extends Component {

    render() {
        return (
            <div id="grad">
                <div style={homeStyle}>
                    <h1 style={h1style}>Welcome to Lyrio</h1>
                    <h3>Login with Spotify to get started</h3>
                    <a className="button" href={login} > LOGIN </a>
                </div>
            </div>
        )
    }
}

const homeStyle = { 

    //backgroundColor: '#cc55aa',
    textAlign:'center',
    marginLeft:'400px',
    marginRight:'400px',
    paddingBottom:'40px',
}

const h1style = { 
    paddingTop: '0px',
    paddingBottom:'40px',
}


export default Home
