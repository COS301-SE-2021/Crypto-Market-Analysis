import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from 'react-grid-carousel'
import { Markup } from 'react-render-markup'


export default function Tweets({coin_name}){
  
  let [tweets, setTweets] = useState([]);
  let [errorResponse, setErrorResponse] = useState([]);
  let tweetsReq = { 
      crypto_name: coin_name,
      email: localStorage.getItem("emailSession")
  }

    useEffect(async () => {
      console.log("TWEETS COMPONENT")
      axios.post('http://localhost:8080/twitter/getCryptoTweets',tweetsReq)
      .then(response =>{
        //console.log(response)
        setTweets(response.data.data)
        // loadScript()
        setErrorResponse(null)

        let tweet = document.getElementsByClassName("tweets")
        console.log(tweet)
        for(let i = 0; i < tweet.length; i++) {
              console.log(tweet[i])
              window.twttr.widgets
              .createTweet('1420970469516263426', tweet[0])
              console.log("TWEET DONE")
          }

          let frames = document.getElementsByTagName("iframe")
          console.log(frames)
          console.log(frames.length)
          // console.log(frames[1])
      },res=>{
        //console.log(res.response)
        setErrorResponse(res.response.data.error)
      })

      
      console.log("TWEETS COMPONENT DONE")
      
    
      // for(let i = 0; i < frames.length; i++) {
      //   frames[i].onload = ()=>{
      //     console.log("iframe loaded")
      //   }
      //   }
      
      // console.log(frames)

    },[])

    const loadScript = () =>{
      console.log("Loaded")
      // window.twttr.widgets.load(document.getElementById("tweets"))
      // let tweet = document.getElementsByClassName("tweets")
      // console.log(tweet)
      // window.twttr.widgets
      // .createTweet('1420970469516263426', tweet)

  }

    return(
        <>
        {errorResponse ? <>
          <div className="container mt-16 " >
            <div className="alert alert-warning alert-dismissible fade show m-auto text-center" style={{width:"70%"}}>
              {errorResponse.includes("The user is not following people on twitter")? <span>Oops, looks like you don't follow anyone on Twitter :(</span>
              :errorResponse.includes("No tweets to display")? <span>Oops, looks like we don't have any tweets to display :(</span>
              :<span>Oops, looks like you don't follow the selected coin :(, choose a coin you follow to see what people are saying about it on twitter</span>}
            </div>
          </div>
        
        </> : <>
        
        <div className="container mt-16">
            <Carousel cols={3} rows={2} gap={3} loop >
              {
                  tweets.map((tweet,index) => {
                    return (
                      <Carousel.Item key={index}>
                          <div  className="w-full lg:w-12/12 xl:w-12/12 px-1 ">
                            <div className="tweets"/>
                          </div> 
                      </Carousel.Item>
                    )
                 })
               }
               {/* {loadScript()} */}
               </Carousel>
           
        </div></>}
        </>
    )
}
Tweets.defaultProps = {
  coin_name: "Bitcoin"
}