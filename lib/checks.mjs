export function username(username, connectedUsers) {
    if (!username || username.length === 0){
        return "please input something";
    }else if (username.length > 20){
        return "username is too long";
    }else if (connectedUsers.filter(val => val.username === username).length === 1){
        return "username already in use";
    }
}