import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Dropdown = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        const target_value = event.target.value;
        setAge(target_value);

        if(target_value === `none`){
            const positive_elements = document.getElementsByClassName(`positive`);
            for(const element of positive_elements)
                element.style.display="block";

            const negative_elements = document.getElementsByClassName(`negative`);
            for(const element of negative_elements)
                element.style.display="block";

            const neutral_elements = document.getElementsByClassName(`neutral`);
            for(const element of neutral_elements)
                element.style.display="block";
        }
        else if(target_value === `positive-dropdown`){
            const positive_elements = document.getElementsByClassName(`positive`);
            for(const element of positive_elements)
                element.style.display="block";

            const negative_elements = document.getElementsByClassName(`negative`);
            for(const element of negative_elements)
                element.style.display="none";

            const neutral_elements = document.getElementsByClassName(`neutral`);
            for(const element of neutral_elements)
                element.style.display="none";
        }
        else if(target_value === `negative-dropdown`){
            const positive_elements = document.getElementsByClassName(`positive`);
            for(const element of positive_elements)
                element.style.display="none";

            const negative_elements = document.getElementsByClassName(`negative`);
            for(const element of negative_elements)
                element.style.display="block";

            const neutral_elements = document.getElementsByClassName(`neutral`);
            for(const element of neutral_elements)
                element.style.display="none";
        }
        else if(target_value === `neutral-dropdown`){
            const positive_elements = document.getElementsByClassName(`positive`);
            for(const element of positive_elements)
                element.style.display="none";

            const negative_elements = document.getElementsByClassName(`negative`);
            for(const element of negative_elements)
                element.style.display="none";

            const neutral_elements = document.getElementsByClassName(`neutral`);
            for(const element of neutral_elements)
                element.style.display="block";
        }
    };

    return (
        <div className={`pr-5`} style={{margin:`auto`, right: `0em`}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="sentiment-label">Sentiment</InputLabel>
                <Select
                    labelId="sentiment-label"
                    id="sentiment"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value={`none`}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={`positive-dropdown`}>Positive</MenuItem>
                    <MenuItem value={`negative-dropdown`}>Negative</MenuItem>
                    <MenuItem value={`neutral-dropdown`}>Neutral</MenuItem>
                </Select>
                <FormHelperText>Filter by sentiment</FormHelperText>
            </FormControl>
        </div>
    );
}

export default function News(props) {
    let [loading, setLoading] = useState(true);
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

        axios.request(options).then(async response => {

            if(response.data){
                news_element.innerHTML = "";
                let news_articles = "";
                let newRow = 0;
                const data = response.data.value;

                for(const article of data){
                    if(newRow === 2){
                        news_articles += "</div>";
                        newRow = 0;
                    }

                    /*let sentiments = [`positive`, `negative`, `neutral`];
                    let sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];*/

                    const analysisOptions = {
                    	method: 'POST',
			            url: 'http://localhost:8000/ArticleAnalytics',
			            data: {
			                article: article.snippet,
			            }
                    }

                    await axios.request(analysisOptions)
                    .then(res => {
                    	console.log(res);
                        const sentiment = res.data;
                        let icon_element = null;

                        let article_card = document.createElement(`div`);
                        let published_date = new Date(article.datePublished);
                        if(sentiment === `positive`){
                            article_card.className = `positive`;
                            article_card.style.cssText = `border: 0.2em groove green; max-width: 30em;`;
                            icon_element = `<p style="text-align: right;"><i class = "fas fa-arrow-up text-success">Positive</i></p>`;
                        }
                        else if (sentiment === `negative`){
                            article_card.className = `negative`;
                            article_card.style.cssText = `border: 0.2em solid red; max-width: 30em;`;
                            icon_element = `<p style="text-align: right;"><i class = "fas fa-arrow-down text-danger">Negative</i></p>`;
                        }
                        else if (sentiment === `neutral`){
                            article_card.className = `neutral`;
                            article_card.style.cssText = `border: 0.2em solid yellow; max-width: 30em;`;
                            icon_element = `<p style="text-align: right;"><i class = "fas fa-minus-circle text-warning">Neutral</i></p>`;
                        }
                        article_card.className += ` col-5 card mr-5 mt-5`;
                        article_card.innerHTML = `<a href=${article.url}>
                                                <div style="max-width: 28em;"><img src=${article.image.thumbnail} class="card-img-top my-3" style="text-decoration: none; color: black; height: 15em;"></div>
                                                <div class="card-body">
                                                    ${icon_element}
                                                    <p class="h6 card-subtitle mb-2 text-muted">${article.provider.name.toUpperCase()}</p> 
                                                    <p class="h6 card-subtitle mb-2 text-muted">${published_date.toLocaleString()}</p>
                                                    <p class="h4 card-title mt-3">${article.title}</p>
                                                </div>
                                              </a>`;
                        newRow++;
                        news_articles += article_card.outerHTML;
                    });
                }
                news_element.innerHTML = news_articles;
            }
            else{
                news_parent_element.innerHTML = "";
                news_parent_element.innerHTML = `<h1 className={'display-4'}>There's no news to display at the moment. Check again later</h1>`;
                news_parent_element.style.cssText = `margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);`
            }
            setLoading(false);

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

    return (
        <div id={`news`} className={`row`}>
            <Dropdown/>
            <div id={`news-articles`} className={`row mt-3 ml-5 col-12`}>

            </div>
        </div>
    )
}