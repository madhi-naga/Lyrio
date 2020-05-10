import React, { Component } from 'react';
import SpotifyNP from '../components/SpotifyNP'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyAPI = new SpotifyWebApi();

export class Callback extends Component {
    
    render() {
        return (
            <div style={lyricStyle} >
                <SpotifyNP /> 
            </div>
        )
    }
}

const lyricStyle = { 
    backgroundColor: '#fff',
    color: '#000'
}


export default Callback
