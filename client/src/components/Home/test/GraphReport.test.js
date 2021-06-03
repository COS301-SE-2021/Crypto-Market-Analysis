import React from "react";
import ReactDom from "react-dom";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<GraphReport></GraphReport>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<GraphReport></GraphReport>).toJSON();
    expect(tree).toMatchSnapshot();
})
