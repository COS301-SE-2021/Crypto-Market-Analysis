import React from "react";
import ReactDom from "react-dom";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import Content from "../Content/Content";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<Content></Content>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<Content></Content>).toJSON();
    expect(tree).toMatchSnapshot();
})
