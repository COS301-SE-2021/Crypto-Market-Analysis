import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Markup } from 'react-render-markup'
import ScriptTag from 'react-script-tag'


import CardTweets from '../Home/Cards/CardTweets/CardTweets'
const t = ["<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">BITCOIN SURGING! GET INTO MICRO-ALTCOINS NOW!?? 💥 <a href=\"https://t.co/SGHBZhp8l5\">https://t.co/SGHBZhp8l5</a> via <a href=\"https://twitter.com/YouTube?ref_src=twsrc%5Etfw\">@YouTube</a></p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1409957796808957955?ref_src=twsrc%5Etfw\">June 29, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">How many Elon tweets does it take to screw up Bitcoin?</p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1408247316692209672?ref_src=twsrc%5Etfw\">June 25, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">RIP John McAfee<br><br>The father of the $1million Bitcoin<br><br>The man who made me a fortune with Verge<br><br>Your passing is a tragic loss, especially in our beloved Crypto space<br><br>You are a legend that will never be forgotten<br><br>Lots of love</p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1407794867636518917?ref_src=twsrc%5Etfw\">June 23, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">THE BITCOIN BLOODBATH IS HERE!?? 💥 <a href=\"https://t.co/yRCfvjfeMp\">https://t.co/yRCfvjfeMp</a> via <a href=\"https://twitter.com/YouTube?ref_src=twsrc%5Etfw\">@YouTube</a></p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1407321599628525568?ref_src=twsrc%5Etfw\">June 22, 2021</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n",
"<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">BITCOIN HISTORY IS ABOUT TO BE MADE!?? 💥 <a href=\"https://t.co/0yr687beNL\">https://t.co/0yr687beNL</a> via <a href=\"https://twitter.com/YouTube?ref_src=twsrc%5Etfw\">@YouTube</a></p>&mdash; Suppoman 🔥₿🚀 (@MichaelSuppo) <a href=\"https://twitter.com/MichaelSuppo/status/1407064124929069056?ref"]
export default function Tweets({}){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return(
        <>
        
        <ScriptTag isHydrating={true} type="text/javascript" src="https://platform.twitter.com/widgets.js" />
        <div id="tweets" className="container mt-16">
            <div style={{borderTop:"1px solid grey",borderBottom:"1px solid grey"}}><h4 className="display-4">Tweets</h4></div>
            <Carousel 
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass=""
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass=""
            >
                {/* {t.map((tweet,index)=>{
                    return (
                        <Markup key={index} markup={tweet} />
                    )
                })} */}
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                
            </Carousel>
        </div>
        </>
    )
}