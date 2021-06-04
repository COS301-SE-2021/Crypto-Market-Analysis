import React from "react";
import ReactDom from "react-dom";
import splash from "../splash";
import {isTSAnyKeyword} from '@babel/types';
import {cleanup, getByTestId, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<splash></splash>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<splash></splash>).toJSON();
    expect(tree).toMatchSnapshot();
})
