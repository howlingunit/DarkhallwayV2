import fs from 'fs';
import * as checks from './checks.mjs';

const connectedUsers = []

function getJson(file){
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
}

function writejson(data, file){
    const Jdata = JSON.stringify(data);
    fs.writeFileSync(file, Jdata, 'utf8');
}


export function initUser(req, res) {
    const msgs = getJson("./lib/messages.json");
    //reqStuff
    const user = req.body[0];
    const time = new Date();
    if(checks.username(user, connectedUsers)){res.status(500); res.json(checks.username(user, connectedUsers)); return;}
    connectedUsers.push({
        username:user,
        lastOnline:time.getTime()
    });
    console.log(connectedUsers);
    msgs.push({"user": "system", "msg": `${user} has joined`});
    console.log(`${user} has joined`);

    //resStuff
    res.json(msgs)
    writejson(msgs, "./lib/messages.json")

}

export function sendMsg(req, res) {
    const msgs = getJson("./lib/messages.json");
    const msg = req.body;
    console.log(msg);
    console.log(`${msg.user} sent ${msg.msg}`)
    msgs.push(msg);
    res.json(msgs);
    writejson(msgs, "./lib/messages.json");
}

export function check(req, res){
    const msgs = getJson("./lib/messages.json");
    const time = new Date();
    let user = req.body[0];
    if(connectedUsers.includes(user) || !user){res.status(500); return;}
    const Cuser = connectedUsers.filter(val => val.username === user);
    Cuser[0].lastOnline = time.getTime();
    connectedUsers.splice(connectedUsers.indexOf(Cuser[0]), 1, Cuser[0]);
    const payload = {
        connectedUsers: connectedUsers,
        msgs: msgs,
    };
    res.json(payload);
    // res.json(JSON.stringify(payload));

}