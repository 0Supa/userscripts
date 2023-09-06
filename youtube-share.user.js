// ==UserScript==
// @name        YouTube Share tracking remover
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     2.1
// @downloadURL https://github.com/0Supa/userscripts/raw/main/youtube-share.user.js
// @author      Supa
// @description Removes the tracking parameter(s) YouTube adds when using the Share button
// ==/UserScript==

const allowedShareParams = ["t"];

const cleanUrl = (el) => {
    const url = new URL(el.value);
    for (const key of url.searchParams.keys()) {
        if (!allowedShareParams.includes(key))
            url.searchParams.delete(key);
    }
    el.value = url.toString();
};

let timeCheckbox = null;
const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        const parent = Array.from(m.addedNodes).find(el => el.classList?.contains("ytd-unified-share-panel-renderer"));

        if (parent) {
            const shareUrl = document.querySelector("#share-url");
            if (shareUrl) {
                cleanUrl(shareUrl);
                const checkbox = document.querySelector("#start-at-checkbox");

                if (checkbox && timeCheckbox !== checkbox) {
                    timeCheckbox = checkbox;
                    timeCheckbox.addEventListener("click", () => {
                        cleanUrl(shareUrl);
                    });
                }
            }
            break;
        }
    }
});

const container = document.querySelector("ytd-app");
if (!container) throw "Parent container not found";
observer.observe(container, { childList: true, subtree: true });
