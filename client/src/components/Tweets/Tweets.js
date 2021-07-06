import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Markup } from 'react-render-markup'
import ScriptTag from 'react-script-tag'

import CardTweets from '../Cards/CardTweets/CardTweets'

export default function Tweets({}){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
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
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                <div style={{margin:"10px",height:"200px"}}><CardTweets/></div>
                
            </Carousel>
        </div>
        </>
    )
}