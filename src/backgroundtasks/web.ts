import { Client } from 'discord.js';
import http from 'http';
import { Public } from '../types/types';

export default (bot: Client, Public: Public) => {
    let connectedAmount = 0;
    const server = http.createServer((req: any, res: any) => {
        const timeUp = Math.floor((Date.now() - (Public.startDate ?? 0)) / 1000);
        res.writeHead(200);
        res.end('Pinged: ' + connectedAmount.toString() + '\n' +
         `Bot running for ${STMSS(timeUp)} (Hour:Min:Sec)`);
    })
    
    server.on('connection', (_socket: any) => {
        connectedAmount++;
    });
    server.listen(3000);

};


const STMSS = (s: any): string => {
    const min: any = s % 60;
    let left: any = ((s - min) / 60);
    if(left >= 60) left = MTHMM(left);
    const right = (min > 9 ? min == 0 ? ':0' : ':' : ':0') + min;
    return(left + right);
};
const MTHMM = (m: any) => {
    const hour: any = m % 60;
    let left: any = ((m - hour) / 60);
    if(left >= 24) left = HTDH(left);
    const right = (hour > 9 ? hour == 0 ? ':0' : ':' : ':0') + hour;
    return(left + right);
};

const HTDH = (h: any) => {
    const day = h % 24;
    const left = ((h - day) / 24);
    const right = (day > 9 ? day == 0 ? 'day(s) 0' : 'day(s) ' : 'day(s) 0') + day;
    return(left + right);
};