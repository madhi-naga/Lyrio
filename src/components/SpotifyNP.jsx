import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
const spotifyAPI = new SpotifyWebApi();
const token = 'GEnP2daAGfM5O3Y6keB8o6o5XRuTSKsBO4vTlhQvJtpxwBkX0xD1fS4c4lNkehb1';
const api = 'https://orion.apiseeds.com/api/music/lyric/';

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
            nowPlaying: { artist: 'None', title: 'None Playing', albumArt: '', lyrics: '' }
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
        spotifyAPI.getMyCurrentPlaybackState()
            .then((resp) =>  { 
                this.setState( {
                    nowPlaying: {artist: resp.item.artists[0].name ,title: resp.item.name, albumArt: resp.item.album.images[0].url, lyrics:'' }
                })       
            })
    }

    getSongJSON(artist, title) {

        if(artist !== 'None' || artist !== undefined){
            var call = api + artist + '/' + title + '?apikey=' + token;
            
            axios.get(call)
                .then(resp => {
                    var lyr = resp.data.result.track.text;
                    if(lyr !== undefined)
                        this.setState({ nowPlaying: {lyrics: lyr} } ) ; 
                });
            //console.log(this.state.nowPlaying.lyrics);
        }
    }

    setNP(){
        this.getNP();
    }

    setLyrics(){
        if(this.state.nowPlaying.artist !== 'None'){
            this.getSongJSON(this.state.nowPlaying.artist, this.state.nowPlaying.title); 
            console.log(this.state.nowPlaying.lyrics);
        }
    }


    render() {
        return (
            <div style={getStyle}>
                <button className="button" onClick={() => 
                {this.setNP(); this.setLyrics() } }>
                    UPDATE LYRICS
                </button>
                <h1>Now Playing: {this.state.nowPlaying.title} </h1>
                <h1>By {this.state.nowPlaying.artist} </h1>
                <div>{} </div>


                <img src={this.state.nowPlaying.albumArt} alt='' style={albumStyle}  />

                <p style={lyricsStyle} >{this.state.nowPlaying.lyrics}</p>

                <div>
                
                
                        
                </div>
            </div>
        )
    }
}

const albumStyle = { 
    height:'200px',
    marginBottom: '20px'
}

const lyricsStyle = { 
    marginTop: '20px',
    textAlign:'center'
}


const getStyle = { 
    textAlign:'center'
}

export default SpotifyNP;
