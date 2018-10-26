import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostText extends Component {
    static propTypes = {
        payload: PropTypes.string.isRequired
    }

    render() {
        return (
            <button onClick={this.onClick}>Run Analysis</button>
        )
    }

    onClick = () => {
        const { payload, onStats } = this.props

        fetch('/PostText', {
            method: 'POST',
            body: JSON.stringify({
                payload: payload
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(json => {
            console.log(json.payload)
            onStats(json.payload)
        }).catch(err => {
            console.log(err)
        })
    }
}
