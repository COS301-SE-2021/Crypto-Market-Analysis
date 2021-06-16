import React, {Component} from "react";
import axios from 'axios';
class reddit extends Component{
constructor() {
    super();
    axios.post('http://localhost:8080/user//RedditData/',cryptoToAdd)
        .then(response => console.log(response))
        .catch(err => {console.error(err);})
}
    return ()
    {
        <ol>
            {data.map(post => (
                <li key={post}>{post}</li>
            ))}
        </ol>
    }


}