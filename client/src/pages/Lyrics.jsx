import React, { Component } from 'react';
import SpotifyInfo from '../components/SpotifyInfo'

export class Lyrics extends Component {

    render() {
        return (
            <div class="lyrics-bkg" >
                <SpotifyInfo /> 
            </div>
        )
    }
}

const lyricStyle = { 
    //backgroundColor: '#141414',
    //color: '#fff',
    minHeight: '100vh',
    overflow:'auto',
}


export default Lyrics
