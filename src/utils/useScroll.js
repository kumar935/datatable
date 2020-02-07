import React, { useState, useEffect } from "react";
import { debounce } from "./utils";



export default function useScroll({ pagination, atBottom, atTop, rows }) {

  function isBottom (el) {
    // return el.getBoundingClientRect().bottom <= window.innerHeight;
    return ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
  }

  function isTop (el) {
    // return el.getBoundingClientRect().top >= 0;
    return document.documentElement.scrollTop == 0;
  }

  const trackScrolling = debounce(() => {
    const wrappedElement = document.querySelector("#app");
    if (isBottom(wrappedElement)) {
      atBottom && atBottom();
      console.log("bottom reached");
    }
    if( isTop(wrappedElement)){
      atTop && atTop();
      console.log("top reached");
    }
  }, 100)

  useEffect(() => {
    if (
      pagination &&
      pagination.type === "infinite" &&
      !pagination.infiniteScrollBtn
    ) {
      document.addEventListener("scroll", trackScrolling);
    } else {
      document.removeEventListener("scroll", trackScrolling);
    }
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [pagination]);

}
