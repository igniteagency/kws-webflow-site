"use strict";(()=>{var i="scriptsLoaded";var E='[data-el="image-lightbox-component"]',s="data-image-lightbox",a=`[${s}-trigger="open"]`,g=`[${s}-trigger="close"]`,r="[data-lightbox-image-list]";window.addEventListener(i,()=>{d()});function d(){document.querySelectorAll(E).forEach(o=>{let n=o.querySelectorAll(a),c=o.querySelectorAll(g),e=o.querySelector("dialog"),l=o.querySelector(r);if(!e){console.debug("No modal dialog found","Looking for <dialog>");return}if(!l){console.debug("No modal images found",`Looking for ${r}`);return}n.forEach(t=>{t.addEventListener("click",()=>{e.showModal()})}),c.forEach(t=>{t.addEventListener("click",()=>{e.close()})})})}})();