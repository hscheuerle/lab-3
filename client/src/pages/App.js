import React, { Component } from 'react';
import FileInputToText from '../components/FileInputToText';
import DisplayStats from '../components/DisplayStats';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ""
        }
    }

    render() {
        // const { input } = this.state
        return (
            <div className="App">
                <DisplayStats />
                <FileInputToText onText={this.onText} />
            </div>
        );
    }
    onText = text => {
        this.setState({
            input: text
        });
        fetch('/post', {
            method: "post",
            body: JSON.stringify({"text": text}),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log(res.status)
            console.log(res.body)
        }).catch(err => {
            console.log(err)
        });
    }
    onClick = () => {
        alert("click");
    }
    onChange = ev => {
        this.setState({
            input: ev.target.value
        });
    }
}


export default App;