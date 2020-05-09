import React, { Component } from 'react';
import SpotifyNP from '../components/SpotifyNP'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyAPI = new SpotifyWebApi();

export class Callback extends Component {
    
    render() {
        return (
            <div>
                <SpotifyNP /> 

                {/* <!--<button onClick= { () => SpotifyNP.getNP() } > Click Here </button> */}

            </div>
        )
    }
}

export default Callback
