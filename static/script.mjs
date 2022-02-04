import { writeToPage } from "./lib/writeToPage.mjs";


function init(){
    const userSub = document.querySelector("#userSubButton");
    userSub.addEventListener("click", msgInit)

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function msgInit(){
    const sendBtn = document.querySelector("#sendMsg");
    sendBtn.addEventListener("click", sendMsg);
    const userName = document.querySelector("#username").value;
    const nameBox = document.querySelector("#nameBox");
    const msgBox = document.querySelector("#msgBox");
    nameBox.classList.add("invis");
    msgBox.classList.remove("invis");

    const payload = [userName];

    const response = await fetch("initUser", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        running();

    } else{
        console.log("svr error");
    }
}

async function sendMsg(){
    const msg = document.querySelector("#msgInput").value;
    const user = document.querySelector("#username").value;
    const payload = {"user":user, "msg":msg};
    fetch("sendMsg", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(payload)
    });
    running()

}
async function running(){
    let localMsgs =[];
    const msgList = document.querySelector("#msgList");
    const username = document.querySelector("#username").value;
    while(true){
        const response = await fetch("check", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify([username])
        });
        const svrData = await response.json();
        const msgs = svrData.msgs;
        const connectedUsers = svrData.connectedUsers;
        console.log(!!(localMsgs === msgs));
        if(!(localMsgs.length === msgs.length)){
            writeToPage(msgs, connectedUsers);
            msgList.scrollTop = msgList.scrollHeight;

        }
        localMsgs = msgs;
        await sleep(1000);

    }
}

window.addEventListener("load", init)