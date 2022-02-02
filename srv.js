import express from 'express';
import * as DH from "./lib/dataHandling.mjs";


const app = express();

app.use(express.static('static'));

app.post("/initUser", express.json(), DH.initUser)

app.listen(8080);
