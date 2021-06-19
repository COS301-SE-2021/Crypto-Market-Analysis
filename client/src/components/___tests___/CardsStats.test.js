import {cleanup, render, screen} from '@testing-library/react';
import CardStats from '../Home/Cards/CardStats'
import React from "react";
import renderer from "react-test-renderer";


afterEach(()=>{
    cleanup();
})
test('should render crypto card component',()=>{
    const coin = { name:"Bitcoin",current_price:"50000",price_change_percentage_24h:"3",symbol:"btc"}
    render(<CardStats
        statSubtitle={coin.name}
        statTitle={coin.current_price}
        statArrow={coin.price_change_percentage_24h > 0 ? "up" : "down"}
        statPercent={coin.price_change_percentage_24h}
        statPercentColor={coin.price_change_percentage_24h > 0 ? "text-emerald-500" : "text-red-500"}
        statDescripiron="In 24 hours"
        statIconName={coin.symbol}
        statIconColor="bg-white-500"/>)
    const crypto  = screen.getByTestId('crypto-card');
    expect(crypto).toBeInTheDocument();
})

test("matches snapshot",()=>{
    const coin = { name:"Bitcoin",current_price:"50000",price_change_percentage_24h:"3",symbol:"btc"}
    const tree = renderer.create(<CardStats
        statSubtitle={coin.name}
        statTitle={coin.current_price}
        statArrow={coin.price_change_percentage_24h > 0 ? "up" : "down"}
        statPercent={coin.price_change_percentage_24h}
        statPercentColor={coin.price_change_percentage_24h > 0 ? "text-emerald-500" : "text-red-500"}
        statDescripiron="In 24 hours"
        statIconName={coin.symbol}
        statIconColor="bg-white-500"/>).toJSON();
    expect(tree).toMatchSnapshot();
})