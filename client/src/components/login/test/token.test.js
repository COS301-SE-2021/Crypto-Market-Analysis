import React from "react";
import ReactDom from "react-dom";
import token from "../token";
import {isTSAnyKeyword} from '@babel/types';
import {cleanup, getByTestId, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<token></token>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<token></token>).toJSON();
    expect(tree).toMatchSnapshot();
})