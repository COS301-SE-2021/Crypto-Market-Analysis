import React, { useEffect } from "react";
import axios from "axios";

export default function News(props) {

    useEffect(() => {
        let news_element = document.getElementById(`news-articles`);

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

                    let article_card = document.createElement(`div`);
                    let published_date = new Date(article.datePublished);
                    article_card.className = `col-5 card mr-5 mt-5`;
                    article_card.style.cssText = `border: 0.1em groove black;`
                    article_card.innerHTML = `<a href=${article.url}>
                                                <img src=${article.image.thumbnail} class="card-img-top my-3" style="text-decoration: none; color: black;">
                                                <div class="card-body">
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
                news_element.innerHTML = "";
                news_element.innerHTML = `<h1 className={'display-4'}>There's no news to display at the moment. Check again later</h1>`;
                news_element.style.cssText = `margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
            }

        }).catch(error => {
            news_element.innerHTML = "";
            news_element.innerHTML = `<h1 className={'display-4'}>Cannot get news articles at this moment. Please try again later</h1>`;
            news_element.style.cssText = `margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
        });

        return() => {
            news_element.innerHTML = "";
        }

    }, []);

    return (
        <div id={`news-articles`}></div>
    )
}