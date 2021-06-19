import React from "react";
import ReactDom from "react-dom";
import login from "../login/login";
import {isTSAnyKeyword} from '@babel/types';
import {cleanup, getByTestId, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<login></login>, div)
})

it("matches snapshot",()=>{
    const tree = renderer.create(<login></login>).toJSON();
    expect(tree).toMatchSnapshot();
})