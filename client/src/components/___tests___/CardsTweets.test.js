import {cleanup, render, screen} from '@testing-library/react';
import CardTweets from '../Home/Cards/CardTweets/CardTweets'
import renderer from "react-test-renderer";
import React from "react";

afterEach(()=>{
    cleanup();
})

test('should render tweet component',()=>{
    const tweetInfo = { tweetOwner:"Elon Musk",tweetContent:"Bitcoin is cool"}
    render(<CardTweets tweetOwner={tweetInfo.tweetOwner} tweetContent={tweetInfo.tweetContent}/>)
    const tweet  = screen.getByTestId('tweet-card');
    expect(tweet).toBeInTheDocument();
})

test("matches snapshot",()=>{
    const tweetInfo = { tweetOwner:"Elon Musk",tweetContent:"Bitcoin is cool"}
    const tree = renderer.create(<CardTweets
        tweetOwner={tweetInfo.tweetOwner}
        tweetContent={tweetInfo.tweetContent}/>).toJSON();
    expect(tree).toMatchSnapshot();
})