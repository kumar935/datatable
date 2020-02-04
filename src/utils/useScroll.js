import React, { useState, useEffect } from "react";

export default function useScroll({ pagination, atBottom, atTop, rows }) {

  function isBottom (el) {
    // return el.getBoundingClientRect().bottom <= window.innerHeight;
    return ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
  }

  function isTop (el) {
    // return el.getBoundingClientRect().top >= 0;
    return document.documentElement.scrollTop == 0;
  }

  function trackScrolling() {
    const wrappedElement = document.querySelector("#app");
    if (isBottom(wrappedElement)) {
      atBottom && atBottom();
      console.log("bottom reached");
      // document.removeEventListener('scroll', trackScrolling);
    }
    if( isTop(wrappedElement)){
      atTop && atTop();
      console.log("top reached");
    }
  }

  useEffect(() => {
    if (
      pagination &&
      pagination.type === "infinite" &&
      !pagination.infiniteScrollBtn
    ) {
      document.addEventListener("scroll", trackScrolling);
    }
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

}
