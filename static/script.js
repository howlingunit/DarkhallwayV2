function init(){
    const userSub = document.querySelector("#userSubButton");
    userSub.addEventListener("click", msgInit)

}

async function msgInit(){
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
        const msgs = await response.json();
        running(msgs);

    } else{
        console.log("svr error");
    }
}

function writeMsgs(msgs){
    const msgList = document.querySelector("#msgList");
    for(item of msgs){
        const msg = document.createElement("li");
        msg.textContent = `${item.user}:${item.msg}`;
        msgList.appendChild(msg);
    }
}

function running(msgs){
    writeMsgs(msgs);
}

window.addEventListener("load", init)