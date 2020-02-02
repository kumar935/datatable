import React from "react";
import { render } from 'react-dom';
import Demo from "./Demo/Demo";
import "../style/datatable.css";
import * as firebase from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig.json";

const Root = () => (
    <Demo/>
)

const renderApp = () => {
  render(<Root />, document.getElementById("app"))
}

renderApp();



// Initialize Firebase
firebase.initializeApp(firebaseConfig || {});
