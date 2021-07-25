import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from 'react-grid-carousel'
import { Markup } from 'react-render-markup'
import ScriptTag from 'react-script-tag'


const tweets = ["<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">BITCOIN SURGING! GET INTO MICRO-ALTCOINS NOW!?? 💥 <a href=\"https://t.co/SGHBZhp8l5\">https://t.co/SGHBZhp8l5</a> via <a href=\"https://twitter.com/YouTube?ref_src=twsrc%5Etfw\">@YouTube</a></p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1409957796808957955?ref_src=twsrc%5Etfw\">June 29, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">How many Elon tweets does it take to screw up Bitcoin?</p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1408247316692209672?ref_src=twsrc%5Etfw\">June 25, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">RIP John McAfee<br><br>The father of the $1million Bitcoin<br><br>The man who made me a fortune with Verge<br><br>Your passing is a tragic loss, especially in our beloved Crypto space<br><br>You are a legend that will never be forgotten<br><br>Lots of love</p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1407794867636518917?ref_src=twsrc%5Etfw\">June 23, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">THE BITCOIN BLOODBATH IS HERE!?? 💥 <a href=\"https://t.co/yRCfvjfeMp\">https://t.co/yRCfvjfeMp</a> via <a href=\"https://twitter.com/YouTube?ref_src=twsrc%5Etfw\">@YouTube</a></p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1407321599628525568?ref_src=twsrc%5Etfw\">June 22, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n"
]
export default function Tweets({coin_name}){
  
  // let [tweets, setTweets] = useState({});
  let tweetsReq = { 
      crypto_name: coin_name,
      email: localStorage.getItem("emailSession")
  }

    useEffect(async () => {
      axios.post('http://localhost:8080/twitter/getCryptoTweets',tweetsReq)
      .then(response =>{
          console.log("TWEETS")
          console.log(response)
          //  setTweets()
      })
      .catch(err => {console.error(err);})

      
    },[])
    return(
        <>
        
        <ScriptTag isHydrating={true} type="text/javascript" src="https://platform.twitter.com/widgets.js" />
        <div id="tweets" className="container mt-16">
            
            <Carousel cols={3} rows={2} gap={8} loop >
              {
                    tweets.map((tweet) => {
                    return (
                      <Carousel.Item>
                        <div  className="w-full lg:w-12/12 xl:w-12/12 px-4 mt-5">
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