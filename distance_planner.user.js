// ==UserScript==
// @name         GeoFS Flight Time Calculator with Toggle
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Toggleable flight time calculator for GeoFS
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleCalcBtn';
    toggleBtn.textContent = '🧮 Flight Calc';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '10px';
    toggleBtn.style.left = '10px';
    toggleBtn.style.zIndex = '10000';
    toggleBtn.style.padding = '8px 12px';
    toggleBtn.style.background = 'rgba(0,0,0,0.7)';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '6px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.fontSize = '14px';
    toggleBtn.style.fontFamily = 'sans-serif';
    document.body.appendChild(toggleBtn);

    let boxVisible = false;
    let box;

    toggleBtn.onclick = () => {
        if (boxVisible) {
            box.style.display = 'none';
            boxVisible = false;
        } else {
            if (!box) {
                createCalculatorBox();
            }
            box.style.display = 'block';
            boxVisible = true;
        }
    };

    function createCalculatorBox() {
        box = document.createElement("div");
        box.id = "geofs-timecalc";
        box.style.position = "fixed";
        box.style.top = "50px";
        box.style.left = "10px";
        box.style.background = "rgba(0,0,0,0.85)";
        box.style.color = "#fff";
        box.style.padding = "15px";
        box.style.borderRadius = "10px";
        box.style.zIndex = "9999";
        box.style.fontFamily = "sans-serif";
        box.style.width = "260px";
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

        document.getElementById("closeBtn").onclick = () => {
            box.style.display = 'none';
            boxVisible = false;
        };

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

