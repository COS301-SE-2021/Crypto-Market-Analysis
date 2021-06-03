import React from "react";
import ReactDom from "react-dom";
import token from "../token";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"

it("renders without crashing", ()=>{
    const div =document.createElement("div");
    ReactDom.render(<token></token>, div)
})
