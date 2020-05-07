import React, { Component } from 'react'
import '../App.css'

export class Home extends Component {
    render() {
        return (
            <div style={homeStyle}>
                <h1>Welcome to Lyrio</h1>
                <h3>Login with Spotify to get started</h3>
                <button className="button" > LOGIN </button>
            </div>
        )
    }
}

const homeStyle = { 
    backgroundColor: '#fff',
    textAlign:'center'
}

const btnStyle = { 
    backgroundColor: '#fff',
    color:'#000',
    textAlign:'center'
}


export default Home
