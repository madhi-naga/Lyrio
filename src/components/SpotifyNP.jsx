import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyAPI = new SpotifyWebApi();

export class SpotifyNP extends Component {

    
    constructor(){
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        console.log(params);

        if (token) { 
            spotifyAPI.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { artist: "None", title: 'None Playing', albumArt: '' }
          }
    
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        
        e = r.exec(q)

        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }

        return hashParams;
    }

    getNP() { 
        spotifyAPI.getMyCurrentPlayingTrack()
            .then((resp) =>  { 
                this.setState( {
                    nowPlaying: {artist: resp.item.artists[0].name ,title: resp.item.name, albumArt: resp.item.album.images[0].url }
                })       
            })
    }

    render() {
        return (
            <div style={getStyle}>
                <h1>Now Playing: {this.state.nowPlaying.title} </h1>
                <h1>By {this.state.nowPlaying.artist} </h1>

                <img src={this.state.nowPlaying.albumArt} alt='' style={{height:'200px'}}  />
                <h2>{this.state.title}</h2>
                <div>
                <button onClick={() => this.getNP()}>
                            Check Now Playing
                </button>
                
                        
                </div>
            </div>
        )
    }


}

const getStyle = { 
    textAlign:'center'
}

export default SpotifyNP;
