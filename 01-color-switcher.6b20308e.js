const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e=null,n=!1;t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(()=>{n||(e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3),n=!0,t.startBtn.disabled=!0,t.stopBtn.disabled=!1)})),t.stopBtn.addEventListener("click",(()=>{n&&(clearInterval(e),document.body.style.backgroundColor="",n=!1,t.startBtn.disabled=!1,t.stopBtn.disabled=!0)}));
//# sourceMappingURL=01-color-switcher.6b20308e.js.map
