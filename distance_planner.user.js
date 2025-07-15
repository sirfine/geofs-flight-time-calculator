// ==UserScript==
// @name         GeoFS Flight Time Calculator (Draggable)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds a draggable flight time calculator to GeoFS based on cruise speed and distance
// @author       You
// @match        https://www.geo-fs.com/geofs.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = '🧮 Flight Time';
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.top = '10px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.zIndex = '9999';
    toggleBtn.style.padding = '8px 12px';
    toggleBtn.style.borderRadius = '6px';
    toggleBtn.style.border = 'none';
    toggleBtn.style.background = '#444';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.cursor = 'move';  // draggable indicator
    document.body.appendChild(toggleBtn);

    // Make button draggable
    let isDragging = false;
    let offsetX, offsetY;

    toggleBtn.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - toggleBtn.getBoundingClientRect().left;
        offsetY = e.clientY - toggleBtn.getBoundingClientRect().top;
        toggleBtn.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            toggleBtn.style.left = `${e.clientX - offsetX}px`;
            toggleBtn.style.top = `${e.clientY - offsetY}px`;
            toggleBtn.style.right = ''; // clear right so it doesn’t fight with left
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        toggleBtn.style.cursor = 'move';
    });

    // Create calculator box
    const calcBox = document.createElement('div');
    calcBox.style.position = 'absolute';
    calcBox.style.top = '60px';
    calcBox.style.right = '10px';
    calcBox.style.padding = '10px';
    calcBox.style.border = '1px solid #aaa';
    calcBox.style.background = '#222';
    calcBox.style.color = '#fff';
    calcBox.style.zIndex = '9999';
    calcBox.style.borderRadius = '8px';
    calcBox.style.display = 'none';
    calcBox.innerHTML = `
        <div><b>Flight Time Calculator</b></div>
        <label>Cruise Speed (kts):</label><br>
        <input id="cruiseSpeed" type="number" value="160" style="width: 100%;"><br>
        <label>Distance (nm):</label><br>
        <input id="distance" type="number" value="80" style="width: 100%;"><br>
        <label>Buffer Time (min):</label><br>
        <input id="bufferTime" type="number" value="10" style="width: 100%;"><br><br>
        <button id="calcBtn">Calculate</button>
        <div id="result" style="margin-top: 10px;"></div>
        <button id="closeCalc" style="margin-top: 8px;">✖️ Close</button>
    `;
    document.body.appendChild(calcBox);

    // Toggle visibility
    toggleBtn.addEventListener('click', () => {
        calcBox.style.display = calcBox.style.display === 'none' ? 'block' : 'none';
    });

    // Close button
    document.getElementById('closeCalc')?.addEventListener('click', () => {
        calcBox.style.display = 'none';
    });

    // Calculation logic
    document.getElementById('calcBtn')?.addEventListener('click', () => {
        const speed = parseFloat(document.getElementById('cruiseSpeed').value);
        const distance = parseFloat(document.getElementById('distance').value);
        const buffer = parseFloat(document.getElementById('bufferTime').value);

        if (!isNaN(speed) && !isNaN(distance)) {
            const flightTime = distance / speed * 60 + buffer;
            const mins = Math.floor(flightTime);
            const secs = Math.round((flightTime - mins) * 60);
            document.getElementById('result').innerText =
                `Flight time: ${mins} min ${secs} sec`;
        } else {
            document.getElementById('result').innerText = 'Enter valid numbers.';
        }
    });
})();
