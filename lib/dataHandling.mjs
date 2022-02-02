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