import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import CardStats from "../components/Home/Cards/CardStats" ;
import CardTweets from "../components/Home/Cards/CardTweets/CardTweets" ;
import SentimentSpeedometer from "../components/Home/GraphReport/AnalysisGraph"


export default function DetailedInfo() {
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
      
        <div className="container">
            {/* <div style={{borderTop:"1px solid grey",borderBottom:"1px solid grey"}}><h4 className="display-4">Cryptocurrency</h4></div> */}
            <div style={{width:"70%",margin:"auto",height:"190px"}}><CardStats/></div>
        </div>

        <div className="container">
       
            <div style={{borderTop:"1px solid grey",borderBottom:"1px solid grey",}}><h4 className="display-4">Sentiment Analyis</h4></div>
            
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
         
          <div style={{margin:"10px",height:"190px"}}><SentimentSpeedometer/></div>
          <div style={{margin:"10px",height:"190px"}}><SentimentSpeedometer/></div>
          <div style={{margin:"10px",height:"190px"}}><SentimentSpeedometer/></div>
          <div style={{margin:"10px",height:"190px"}}><SentimentSpeedometer/></div>
    </Carousel>
    </div>
    {/* <hr /> */}
    <div className="container mt-16">
            
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
         
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
    </Carousel>
    </div>
    </>
  )
  

}