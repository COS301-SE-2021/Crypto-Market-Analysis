import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from 'react-grid-carousel'
import { Markup } from 'react-render-markup'
import ScriptTag from 'react-script-tag'


export default function Tweets({coin_name}){
  
  let [tweets, setTweets] = useState([]);
  let tweetsReq = { 
      crypto_name: coin_name,
      email: localStorage.getItem("emailSession")
  }

    useEffect(async () => {
      axios.post('http://localhost:8080/twitter/getCryptoTweets',tweetsReq)
      .then(response =>{
          setTweets(response.data.data)
      })
      .catch(err => {console.error(err);})

      
    },[])
    return(
        <>
        
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
           
        </div>
        </>
    )
}
Tweets.defaultProps = {
  coin_name: "Bitcoin"
}