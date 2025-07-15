// ==UserScript==
// @name         GeoFS Distance-Based Flight Time Calculator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Calculates estimated flight time based on cruise speed, distance, and buffer time. Includes close button.
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait until GeoFS UI is ready
    const waitForUI = setInterval(() => {
        if (document.getElementById("geofs-ui")) {
            clearInterval(waitForUI);
            addCalculator();
        }
    }, 1000);

    function addCalculator() {
        const box = document.createElement("div");
        box.id = "geofs-timecalc";
        box.style.position = "absolute";
        box.style.top = "100px";
        box.style.left = "20px";
        box.style.background = "rgba(0,0,0,0.85)";
        box.style.color = "#fff";
        box.style.padding = "15px";
        box.style.borderRadius = "10px";
        box.style.zIndex = "9999";
        box.style.fontFamily = "sans-serif";
        box.style.width = "250px";
        box.style.boxShadow = "0 0 10px #000";
        box.innerHTML = `
            <div style="text-align:right; margin:-10px -10px 5
