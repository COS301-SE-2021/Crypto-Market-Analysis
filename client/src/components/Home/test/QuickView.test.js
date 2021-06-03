import React from "react";
import ReactDom from "react-dom";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
import QuickView from "../QuickView/QuickView";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<QuickView></QuickView>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<QuickView></QuickView>).toJSON();
    expect(tree).toMatchSnapshot();
})
