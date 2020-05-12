import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
const spotifyAPI = new SpotifyWebApi();
const atoken = 'GEnP2daAGfM5O3Y6keB8o6o5XRuTSKsBO4vTlhQvJtpxwBkX0xD1fS4c4lNkehb1';
const api = 'https://orion.apiseeds.com/api/music/lyric/';

export class SpotifyNP extends Component {

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
            .then((resp) =>  { 
                this.setState( prevState => ({ 
                    loggedIn: prevState.loggedIn,
                    userData: prevState.userData,
                    nowPlaying: {artist: resp.item.artists[0].name ,title: resp.item.name, albumArt: resp.item.album.images[0].url, lyrics:'' }
                }))       
            })
            .catch(error => { console.log(error)});
    }

    getSongJSON(artist, title) {

        if(artist !== 'None' || artist !== undefined){
            let call = api + artist + '/' + title + '?apikey=' + atoken;
          
            axios.get(call)
                .then(resp => {
                    let lyr = resp.data.result.track.text;
                    lyr = lyr.replace(/\n/g, "\n");
                    this.setState( prevState => ({
                        loggedIn: prevState.loggedIn,
                        userData: prevState.userData,
                        nowPlaying: {...prevState.nowPlaying, lyrics: lyr} 
                    })) 
                })
                .catch (error => {
                    console.log(error);
                });
            console.log(this.state);
        }
    }


    setLyrics(){
        if(this.state.nowPlaying.artist !== 'None'){
            this.getSongJSON(this.state.nowPlaying.artist, this.state.nowPlaying.title); 
        }
    }

    toggleBtnState = () => {
        this.getNP();

        this.setLyrics();   
    }

    retLyrics(){
        if (this.state.nowPlaying.lyrics === '' && this.state.nowPlaying.artist !== 'None')
            return "Can't find the lyrics for this song :(";
        else
            return this.state.nowPlaying.lyrics; 
    }

    render() {
        return (
            <div style={getStyle}>
                <button className="button" onClick= {this.toggleBtnState } >
                    UPDATE LYRICS
                </button>
                <h1>Now Playing: {this.state.nowPlaying.title} </h1>
                <h1>By {this.state.nowPlaying.artist} </h1>
                <div>{} </div>


                <img src={this.state.nowPlaying.albumArt} alt='' style={albumStyle}  />

                <h3 style={lyricsStyle}> {this.retLyrics()} </h3>

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
    textAlign:'center',
    fontWeight: 'normal',
    whiteSpace: 'pre-wrap'
}


const getStyle = { 
    textAlign:'center'
}

export default SpotifyNP;
