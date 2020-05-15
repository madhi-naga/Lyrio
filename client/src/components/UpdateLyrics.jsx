
import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

require('dotenv').config();
const atoken = `${process.env.REACT_APP_APISEEDS_ID}`;
const api = 'https://orion.apiseeds.com/api/music/lyric/';

export class UpdateLyrics extends Component {

    state = { 
        artist: this.props.artist,
        title: this.props.title,
        lyrics: this.props.lyrics
    }

    componentDidUpdate(prevState) {

        let artist = prevState.artist;
        let title = prevState.title;

        if(title !== this.state.title && prevState.lyrics === ''){
            let call = api + artist + '/' + title + '?apikey=' + atoken;
          
            axios.get(call)
                .then(resp => {
                    let lyr = resp.data.result.track.text;
                    lyr = lyr.replace(/\n/g, "\n");
                    this.setState( prevState => ({
                        artist: artist,
                        title: title,
                        lyrics: lyr 
                    })) 
                })
                .catch (error => {
                    this.setState( prevState => ({
                        artist: artist,
                        title: title,
                        lyrics: '' 
                    })) 
                });
        }
    }

    retLyrics(){
        console.log(this.state);
    
        if (this.state.lyrics === '' && this.state.artist !== 'None')
            return "Can't find the lyrics for this song :(";
        else
            return this.state.lyrics; 
    }  
    

    render() {
        return (
            <div>
                <h3 style={lyricsStyle}> {this.retLyrics()} </h3>
            </div>
        )
    }
}

const lyricsStyle = { 
    marginTop: '20px',
    textAlign:'center',
    fontWeight: 'normal',
    whiteSpace: 'pre-wrap'
}

UpdateLyrics.propTypes = { 
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default UpdateLyrics
