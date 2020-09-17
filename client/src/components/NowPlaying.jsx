import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NowPlaying extends Component {
    
    render() {
        return (
            <div>
                <h1>Now Playing: {this.props.nowPlaying.title} </h1>
                <h1>By {this.props.nowPlaying.artist} </h1>
                <img src={this.props.nowPlaying.albumArt} alt='' style={albumStyle}  />
            </div>

        )
    }
}

const albumStyle = { 
    height:'200px',
    marginBottom: '20px'
}

NowPlaying.propTypes = { 
    nowPlaying: PropTypes.func.isRequired
}

export default NowPlaying
