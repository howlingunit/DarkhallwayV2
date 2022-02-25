export function username(username, connectedUsers) {
    if (!username || username.length === 0){
        return "please input something";
    }else if (username.length > 20){
        return "username is too long";
    }else if (connectedUsers.filter(val => val.username === username).length === 1){
        return "username already in use";
    }
}

export function Cusers(connectedUsers){
    const time = new Date().getTime();
    console.log(connectedUsers)
    for(let i = 0; i<=connectedUsers.length - 1; i++){
        console.log(connectedUsers[i]);
        if(connectedUsers[i].lastOnline <= time - 50){
            connectedUsers.splice(i, 1);
            console.log(`removed ${connectedUsers[i]}`)
        }
    }

    return connectedUsers;
}