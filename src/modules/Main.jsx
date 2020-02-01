import React from "react";
import { render } from 'react-dom';
import Demo from "./Demo/Demo";
import "../style/datatable.css";

const Root = () => (
    <Demo/>
)

const renderApp = () => {
  render(<Root />, document.getElementById("app"))
}

renderApp();
