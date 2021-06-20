import React from "react";
import PropTypes from "prop-types";
import "./CardTweets.css"

export default function CardTweets({
    tweetOwner,
    tweetContent,
   
  }) {
    return (
      < >
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
       
        <div data-testid="tweet-card" className=" flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-3">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-700 uppercase font-bold text-l">
                 {tweetOwner}
                </h5>
                
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                  <h3 className="mb0">
                    <i className="fa fa-twitter text-info pull-right"></i>
                  </h3>
              </div>
            </div>
                  
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-700  font-bold text-m">
                  Tweet
                </h5>
              </div>
            <ul className="list-group">
                <li className="list-group-item">
              <p className="nm">{tweetContent}</p>
                <small className="text-muted">1 day ago</small>
                </li>
                {/* <li class="list-group-item">
                <p class="nm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <a href="#">@officia</a> deserunt mollit anim id est laborum.</p>
                <small class="text-muted">2 day ago</small>
                </li>
                <li class="list-group-item">
                <p class="nm">Duis aute irure dolor in <a href="#">tweet.er</a> in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <small class="text-muted">3 day ago</small>
                </li> */}
            </ul>
          </div>
        </div>
      </>
    )
  }

  CardTweets.defaultProps = {
    tweetOwner:"Tweet Owner",
    tweetContent:"My first Tweet"
  };
  
  CardTweets.propTypes = {
    tweetOwner: PropTypes.string,
    tweetContent: PropTypes.string
  };