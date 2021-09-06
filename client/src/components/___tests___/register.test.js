import React from "react";
import ReactDom from "react-dom";
import register from "../login/register";
import {isTSAnyKeyword} from '@babel/types';
import {cleanup, getByTestId, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login/login";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<register></register>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<register></register>).toJSON();
    expect(tree).toMatchSnapshot();
})