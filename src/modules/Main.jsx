import React from "react";
import { render } from 'react-dom';

const Root = () => (
    <h1>Sup</h1>
)

const renderApp = () => {
  render(<Root />, document.getElementById("app"))
}

renderApp();
