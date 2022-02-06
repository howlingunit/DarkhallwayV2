function writeMsgs(msgs){
    const oldMsgList = document.querySelectorAll(".msg");
    for(const i of oldMsgList){
        i.remove();
    }
    const msgList = document.querySelector("#msgList");
    for(const item of msgs){
        const msg = document.createElement("p");
        msg.classList.add("msg")
        msg.textContent = `${item.user}:${item.msg}`;
        msgList.appendChild(msg);
    }
}

function writeUsers(users){
    const oldUserList = document.querySelectorAll(".user");
    for(const i of oldUserList){
        i.remove();
    }

    const userList = document.querySelector("#userList");
    for(const item of users){
        const user = document.createElement("p");
        user.classList.add("user");
        user.textContent = item.username;
        userList.append(user);
    }
}

export function writeToPage(msgs, connectedUsers){
    writeMsgs(msgs);
    writeUsers(connectedUsers);
}