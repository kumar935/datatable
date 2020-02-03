import React, { useState, useEffect } from "react";

export default function useScroll({ pagination, atBottom, rows }) {

  function isBottom (el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  function trackScrolling() {
    const wrappedElement = document.querySelector("#app");
    if (isBottom(wrappedElement)) {
      atBottom && atBottom();
      console.log("bottom reached");
      // document.removeEventListener('scroll', trackScrolling);
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
