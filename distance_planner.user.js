// ==UserScript==
// @name         GeoFS Distance-Based Flight Time Calculator (Quick Start)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Flight time calculator addon with immediate load
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add the calculator box immediately
    addCalculator();

    function addCalculator() {
        if(document.getElementById("geofs-timecalc")) return; // avoid duplicates

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
            <div style="text-align:right; margin:-10px -10px 5px 0;">
                <button id="closeBtn" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer;">&times;</button>
            </div>
            <strong>🧮 Flight Time Calculator</strong><br><br>
            Speed (KTAS):<br>
            <input id="speedInput" type="number" placeholder="e.g. 160" style="width:100%;"><br><br>
            Distance (NM):<br>
            <input id="distanceInput" type="number" placeholder="e.g. 90" style="width:100%;"><br><br>
            Buffer time (min):<br>
            <input id="bufferInput" type="number" value="10" style="width:100%;"><br><br>
            <button id="calcBtn" style="width:100%; padding:6px; cursor:pointer;">Calculate</button>
            <p id="result" style="margin-top:10px;"></p>
        `;

        document.body.appendChild(box);

        // Close button function
        document.getElementById("closeBtn").onclick = () => {
            box.remove();
        };

        // Calculate button
        document.getElementById("calcBtn").onclick = () => {
            const speed = parseFloat(document.getElementById("speedInput").value);
            const distance = parseFloat(document.getElementById("distanceInput").value);
            const buffer = parseFloat(document.getElementById("bufferInput").value);

            if (isNaN(speed) || isNaN(distance) || isNaN(buffer) || speed <= 0) {
                document.getElementById("result").innerText = "Please enter valid numbers.";
                return;
            }

            const cruiseTime = distance / speed * 60; // minutes
            const totalTime = cruiseTime + buffer;

            document.getElementById("result").innerText =
                `🕒 Est. Flight Time: ${totalTime.toFixed(1)} min total`;
        };
    }
})();

