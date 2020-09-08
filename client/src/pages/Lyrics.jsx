import React, { Component } from 'react';
import SpotifyInfo from '../components/SpotifyInfo'

export class Lyrics extends Component {

    render() {
        return (
            <div style={lyricStyle} >
                <SpotifyInfo /> 
            </div>
        )
    }
}

const lyricStyle = { 
    backgroundColor: '#141414',
    color: '#fff',
    minHeight: '100vh',
}


export default Lyrics
