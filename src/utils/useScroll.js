import React, { useState, useEffect } from "react";

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

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
