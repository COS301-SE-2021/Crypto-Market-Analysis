import React from "react";
import ReactDom from "react-dom";
import {getByTestId, render,cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";
import login from "../login";
afterEach(cleanup);

