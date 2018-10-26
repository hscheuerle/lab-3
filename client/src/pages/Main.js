import React, { Component } from 'react'
import StatsDisplay from '../components/StatsDisplay';
import TextAreaInput from '../components/TextAreaInput';
import PostText from '../services/PostText';

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            stats: {}
        }
    }

    render() {
        const { text, stats } = this.state

        return (
            <div style={CSS.Main}>
                <StatsDisplay 
                    stats={stats}
                />
                <PostText 
                    payload={text} 
                    onStats={stats => this.setState({ stats })}
                />
                <TextAreaInput 
                    onText={text => this.setState({ text })} 
                    value={text}
                />
            </div>
        )
    }
}

const CSS = {
    Main: {
        display: 'block',
        width: '100vw',
        height: '100vh'
    }
}