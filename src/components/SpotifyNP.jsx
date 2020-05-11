import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
const spotifyAPI = new SpotifyWebApi();
const atoken = 'GEnP2daAGfM5O3Y6keB8o6o5XRuTSKsBO4vTlhQvJtpxwBkX0xD1fS4c4lNkehb1';
const api = 'https://orion.apiseeds.com/api/music/lyric/';

export class SpotifyNP extends Component {

    
    constructor(){
        super();
        const params = this.getHashParams();
        var token = params.access_token;
        var rtoken = params.refresh_token;
        //var expires = params.expires_in;
        
        console.log(token);
        console.log(rtoken);
        //console.log(expires);

        if (token) { 
            spotifyAPI.setAccessToken(token);
        }
        else { 
            
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

    newAccessTok = () => {
        
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
            var call = api + artist + '/' + title + '?apikey=' + atoken;

            var artist = this.state.nowPlaying.artist;
            var title = this.state.nowPlaying.title;
            var albumArt = this.state.nowPlaying.albumArt;
            
            
            axios.get(call)
                .then(resp => {
                    var lyr = resp.data.result.track.text;
                    lyr = lyr.replace(/\n/g, "\n");
                    this.setState({ nowPlaying: {artist, title, albumArt, lyrics: lyr} }) ; 
                })
                .catch (error => {
                    console.log('error happened');
                })
            //console.log(this.state.nowPlaying.lyrics);
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
        if (this.state.nowPlaying.lyrics == '' && this.state.nowPlaying.artist !== 'None')
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
                <div>{console.log(this.state.nowPlaying)} </div>
                <div></div>
                <h3 style={lyricsStyle}> {this.retLyrics()} </h3>

                {/* <p>  {this.retLyrics()} </p> */}
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
