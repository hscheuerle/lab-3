import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StatsDisplay extends Component {
    static propTypes = {
        stats: PropTypes.object || {}
    }

    render() {
        const { stats } = this.props

        const divs = []
        for (let key in stats) {
            divs.push(
                <div>
                    <span style={{ marginRight: "1em" }}>{key}</span>
                    <span>{stats[key].toString()}</span>
                </div>
            )
        }

        return (
            <div className="StatsDisplay">
                {divs}
            </div>
        )
    }
}