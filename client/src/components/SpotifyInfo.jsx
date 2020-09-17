import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import '../App.css';
import { NowPlaying } from './NowPlaying.jsx';
import { UpdateLyrics } from './UpdateLyrics.jsx';
const spotifyAPI = new SpotifyWebApi();

export class SpotifyInfo extends Component {

    constructor(){
        super();

        this.state = {
            loggedIn: false,
            userData: '',
            nowPlaying: { artist: 'None', title: 'None Playing', albumArt: '', lyrics: '' }
          }
          
    }

    componentDidMount() { 
        const params = this.getHashParams();
        let token = params.access_token;
        let rtoken = params.refresh_token;
        let error = params.error;

        if (token && rtoken) { 
            spotifyAPI.setAccessToken(token);

            axios.get('https://api.spotify.com/v1/me', { 
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(resp => this.setState( prevState => ({ 
                loggedIn: true,
                userData: resp.data,
                nowPlaying: prevState.nowPlaying 
            })))

        }
        else {
            console.log(error);
        }
    }

    //receives hash of url (for tokens)
    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
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
            .then((resp) => { 
                
                if(resp.item !== undefined){
                    this.setState( (state) => {
                        return { 
                            loggedIn: state.loggedIn,
                            userData: state.userData,
                            nowPlaying: {
                                artist: resp.item.artists[0].name,
                                title: resp.item.name, 
                                albumArt: resp.item.album.images[0].url, 
                                lyrics:'' 
                            }
                        }
                    })       
                }
            })
            .catch(error => { console.log(error)});
    }


    toggleBtnState = () => {
        this.getNP();
    }

    render() {
        return (
            <div class='lyrics-box' style={getStyle}>
                <button className="button" onClick= {this.toggleBtnState} >
                    UPDATE LYRICS
                </button>

                <NowPlaying nowPlaying={this.state.nowPlaying} />

                <UpdateLyrics 
                    artist={this.state.nowPlaying.artist}
                    title={this.state.nowPlaying.title}    
                    lyrics={this.state.nowPlaying.lyrics} />

            </div>
        )
    }
}


const getStyle = { 
    textAlign:'center'
}

export default SpotifyInfo;
