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
    backgroundColor: '#fff',
    color: '#000'
}


export default Lyrics
