import React, { useEffect } from "react";
import axios from "axios";

export default function News(props) {

    useEffect(() => {
        let news_element = document.getElementById(`news-articles`);
        let news_parent_element = document.getElementById(`news`);

        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
                q: props.coin_name,
                pageNumber: '1',
                pageSize: '30',
                autoCorrect: 'true',
                withThumbnails: 'true',
                fromPublishedDate: 'null',
                toPublishedDate: 'null'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
                'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(response => {

            if(response.data){
                news_element.innerHTML = "";
                let news_articles = "";
                let newRow = 0;
                let start = true;
                const data = response.data.value;

                for(const article of data){
                    if(newRow === 2 || start){
                        if(start) {
                            news_articles += "<div class='row mx-5'>"
                            start = false;
                        }
                        else{
                            news_articles += "</div>";
                            news_articles += "<div class='row mx-5'>";
                        }

                        newRow = 0;
                    }

                    let sentiments = [`positive`, `negative`, `neutral`];
                    let sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
                    let icon_element = null;

                    let article_card = document.createElement(`div`);
                    let published_date = new Date(article.datePublished);
                    if(sentiment === `positive`){
                        article_card.style.cssText = `border: 0.1em solid green`;
                        icon_element = `<p style="text-align: right;"><i class = "fas fa-arrow-up text-success">Positive</i></p>`;
                    }
                    else if (sentiment === `negative`){
                        article_card.style.cssText = `border: 0.1em solid red`;
                        icon_element = `<p style="text-align: right;"><i class = "fas fa-arrow-down text-danger">Negative</i></p>`;
                    }
                    else if (sentiment === `neutral`){
                        article_card.style.cssText = `border: 0.1em solid yellow`;
                        icon_element = `<p style="text-align: right;"><i class = "fas fa-minus-circle text-warning">Neutral</i></p>`;
                    }
                    article_card.className = `col-5 card mr-5 mt-5`;
                    article_card.innerHTML = `<a href=${article.url}>
                                                <div><img src=${article.image.thumbnail} class="card-img-top my-3" style="text-decoration: none; color: black; height: 13em;"></div>
                                                <div class="card-body">
                                                    ${icon_element}
                                                    <p class="h6 card-subtitle mb-2 text-muted">${article.provider.name.toUpperCase()}</p> 
                                                    <p class="h6 card-subtitle mb-2 text-muted">${published_date.toLocaleString()}</p>
                                                    <p class="h4 card-title mt-3">${article.title}</p>
                                                </div>
                                              </a>`;
                    newRow++;
                    news_articles += article_card.outerHTML;
                }

                news_element.innerHTML = news_articles;
            }
            else{
                news_parent_element.innerHTML = "";
                news_parent_element.innerHTML = `<h1 className={'display-4'}>There's no news to display at the moment. Check again later</h1>`;
                news_parent_element.style.cssText = `margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
            }

        }).catch(error => {
            console.error(`An error occurred while trying to retrieve the news articles: ${error}`);
            news_parent_element.innerHTML = "";
            news_parent_element.innerHTML = `<h1 className={'display-4'}>Cannot get news articles at this moment. Please try again later</h1>`;
            news_parent_element.style.cssText = `margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
        });

        return() => {
            news_parent_element.innerHTML = "";
        }

    }, []);

    <script src={`https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js%22%3E`}>

    </script>
    return (
        <div id={`news`}>
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown
                    Example
                    <span className="caret">

                    </span>
                </button>
                <ul className="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                </ul>
            </div>
            <div id={`news-articles`} className={`mt-5`}>

            </div>
        </div>
    )
}