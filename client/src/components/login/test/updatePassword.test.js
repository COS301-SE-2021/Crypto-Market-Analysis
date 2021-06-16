import React from "react";
import ReactDom from "react-dom";
import updatePassword from "../updatePassword";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
afterEach(cleanup);
it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<updatePassword></updatePassword>, div)
})
it("matches snapshot",()=>{
    const tree = renderer.create(<updatePassword></updatePassword>).toJSON();
    expect(tree).toMatchSnapshot();
})
