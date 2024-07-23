"use client";
import { useEffect } from "react";

function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
  useEffect(() => {
    // Function to set the default zoom level
    const setDefaultZoom = () => {
      document.body.style.transform = "scale(0.9)";
      document.body.style.transformOrigin = "0 0";
    };

    // Function to handle keydown events
    const handleKeydown = (e) => {
      if (
        keyboardCheck &&
        e.ctrlKey &&
        (e.keyCode === 61 || // '=' key
          e.keyCode === 107 || // '+' key
          e.keyCode === 173 || // '-' key (Firefox)
          e.keyCode === 109 || // '-' key
          e.keyCode === 187 || // '+' key
          e.keyCode === 189) // '-' key
      ) {
        e.preventDefault();
      }
    };

    // Function to handle wheel events
    const handleWheel = (e) => {
      if (scrollCheck && e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Apply the default zoom level
    setDefaultZoom();

    // Add event listeners
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [scrollCheck, keyboardCheck]);
}

export default usePreventZoom;
