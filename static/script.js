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

function writeMsgs(msgs){
    const oldMsgList = document.querySelectorAll(".msg");
    for(i of oldMsgList){
        i.remove();
    }
    const msgList = document.querySelector("#msgList");
    for(item of msgs){
        const msg = document.createElement("li");
        msg.classList.add("msg")
        msg.textContent = `${item.user}:${item.msg}`;
        msgList.appendChild(msg);
    }
}

async function sendMsg(){
    const msg = document.querySelector("#msgInput").value;
    const user = document.querySelector("#username").value;
    const payload = {"user":user, "msg":msg};
    console.log(payload);
    const response = await fetch("sendMsg", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(payload)
    });
    running()

}
async function running(){
    const username = document.querySelector("#username").value;
    while(true){
        const response = await fetch("check", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify([username])
        });
        const msgs = await response.json();
        console.log(msgs);
        writeMsgs(msgs);
        sleep(1000);

    }
}

window.addEventListener("load", init)