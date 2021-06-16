import React, {Component} from "react";
import axios from 'axios';

export default class reddit extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.post(`http://localhost:8080/user/RedditData/`)
            .then(res => {
                const persons = res;
                this.setState({ persons });
                console.log(res);
            })
    }

    render() {
        return (
            <ul>
                { this.state.persons.map(person => <li>{person.name}</li>)}
            </ul>
        )
    }
}