import fs from 'fs';

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
    const User = req.body[0];
    connectedUsers.push(User);
    console.log(connectedUsers);
    msgs.push({"user": "system", "msg": `${User} has joined`});
    console.log(`${User} has joined`);

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
    const payload = {
        connectedUsers: connectedUsers,
        msgs: msgs,
    };
    res.json(payload);
    // res.json(JSON.stringify(payload));

}