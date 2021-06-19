import React from "react";
import ReactDom from "react-dom";
import {isTSAnyKeyword} from '@babel/types';
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
import QuickView from "../Home/QuickView/QuickView";
afterEach(cleanup);


