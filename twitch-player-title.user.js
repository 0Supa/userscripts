// ==UserScript==
// @name        Twitch Player channel title
// @namespace   Violentmonkey Scripts
// @match       https://player.twitch.tv/*
// @grant       none
// @version     1.0
// @downloadURL https://github.com/0Supa/userscripts/raw/main/twitch-player-title.user.js
// @author      Supa
// @description Adds the Twitch channel's name to the tab title
// ==/UserScript==

const urlParams = new URLSearchParams(window.location.search);
const channel = urlParams.get("channel");
if (channel) document.title = `${channel} - Twitch`;
