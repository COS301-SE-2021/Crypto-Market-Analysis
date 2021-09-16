import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from 'react-grid-carousel'
import "./Tweets.css"
import ClipLoader from "react-spinners/ClipLoader"


export default function Tweets({coin_name}){
  
  let [tweets, setTweets] = useState([]);
  let [errorResponse, setErrorResponse] = useState([]);
  let [loader, setLoader] = useState(true);
  let tweetsReq = { 
      crypto_name: coin_name,
      email: localStorage.getItem("emailSession")
  }

    useEffect(async () => {
      axios.post('http://localhost:8080/twitter/getTweetIDs',tweetsReq)
      .then(async(response) => {
        setTweets(response.data.data);
        setErrorResponse(null);
        setLoader(false)
        let tweet = document.getElementsByClassName("tweets");
        for(let i = 0; i < tweet.length; i++) {
            await window.twttr.widgets
            .createTweet(response.data.data[i], tweet[i]) 
          }
          
      },res=>{
        
        setErrorResponse(res.response.data.error)
      })
    },[])

    return(
        <React.Fragment>
        {errorResponse ? <React.Fragment>
          <div className="container mt-16" >
            <div className="alert alert-warning alert-dismissible fade show m-auto text-center" style={{width:"70%"}}>
              {errorResponse.includes("The user is not following people on twitter")? <span>Oops, looks like you don't follow anyone on Twitter :(</span>
              :errorResponse.includes("No tweets to display")? <span>Oops, looks like we don't have any tweets to display :(</span>
              :<span>Oops, looks like you don't follow the selected coin :(, choose a coin you follow to see what people are saying about it on twitter</span>}
            </div>
          </div>
        
        </React.Fragment> :<React.Fragment></React.Fragment>}
         {loader ?
         <div className="mx-auto mt-16 text-center"><ClipLoader className="mx-auto mt-16" loading={loader} size={150} /> </div>
        : <div className="carousel-container container mt-8" >
            <Carousel cols={3} rows={2} gap={3}>
              {
                  tweets.map((tweet,index) => {
                    return (
                      <Carousel.Item key={index} >
                        <div className="tweets" />
                      </Carousel.Item>
                    )
                 })
              }
            </Carousel>
        </div>}
        </React.Fragment>
    )
}
Tweets.defaultProps = {
  coin_name: "Bitcoin"
}