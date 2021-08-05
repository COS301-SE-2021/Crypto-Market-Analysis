import React, { useState, useEffect } from "react";
import axios from "axios";

export default function News() {
    useEffect(() => {
        const crypto_name = `bitcoin`
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
                q: crypto_name,
                pageNumber: '1',
                pageSize: '50',
                autoCorrect: 'true',
                withThumbnails: 'true',
                fromPublishedDate: 'null',
                toPublishedDate: 'null'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_apiKey,
                'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);
    return (<></>)
}