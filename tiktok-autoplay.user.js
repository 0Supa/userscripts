// ==UserScript==
// @name        TikTok autoplay
// @namespace   Violentmonkey Scripts
// @match       https://*.tiktok.com/*
// @grant       none
// @version     1.0
// @author      Supa
// @description Goes to the next video when the current one ends
// ==/UserScript==

let videoPlayer;
setInterval(() => {
    const newPlayer = document.querySelector("video");
    if (newPlayer && newPlayer != videoPlayer) {
        videoPlayer = newPlayer;
        videoPlayer.addEventListener("ended", () => {
            const skipButton = document.querySelector('[aria-label="Go to next video"]');
            if (skipButton) skipButton.click();
        })
    }
}, 500);
