import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from 'react-grid-carousel'
import { Markup } from 'react-render-markup'
import ScriptTag from 'react-script-tag'


export default function Tweets({coin_name}){
  
  let [tweets, setTweets] = useState([]);
  let [errorResponse, setErrorResponse] = useState([]);
  let tweetsReq = { 
      crypto_name: coin_name,
      email: localStorage.getItem("emailSession")
  }

    useEffect(async () => {
      axios.post('http://localhost:8080/twitter/getCryptoTweets',tweetsReq)
      .then(response =>{
        setTweets(response.data.data)
        setErrorResponse(null)
      },res=>{
        console.log(res.response.data)
        setErrorResponse(res.response.data.error)
      })
    },[])

    return(
        <>
        {console.log(errorResponse)}
        {errorResponse ? <>
          <div className="container mt-16 " >
            <div className="alert alert-warning alert-dismissible fade show m-auto text-center" style={{width:"70%"}}>
              {errorResponse.includes("The user is not following people on twitter")? <span>Oops, looks like you don't follow anyone on Twitter :(</span>
              :errorResponse.includes("No tweets to display")? <span>Oops, looks like we don't have any tweets to display :(</span>
              :<span>Oops, looks like you don't follow the selected coin :(, choose a coin you follow to see what people are saying about it on twitter</span>}
            </div>
          </div>
        
        </> : <>
        <ScriptTag isHydrating={true} type="text/javascript" src="https://platform.twitter.com/widgets.js" />
        <div id="tweets" className="container mt-16">
            <Carousel cols={3} rows={2} gap={3} loop >
              {
                    tweets.map((tweet) => {
                    return (
                      <Carousel.Item>
                        <div  className="w-full lg:w-12/12 xl:w-12/12 px-1">
                          <Markup markup={tweet} />
                        </div> 
                      </Carousel.Item>
                    )
                 })
               } 
               </Carousel>
           
        </div></>}
        </>
    )
}
Tweets.defaultProps = {
  coin_name: "Bitcoin"
}