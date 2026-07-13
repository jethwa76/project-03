import nodemailer from 'nodemailer'; import {env} from '../config/env.js';
const transporter=env.SMTP_HOST&&env.SMTP_USER ? nodemailer.createTransport({host:env.SMTP_HOST,port:env.SMTP_PORT,auth:{user:env.SMTP_USER,pass:env.SMTP_PASS}}) : null;
export async function sendMail(to:string,subject:string,html:string){if(!transporter){if(env.NODE_ENV==='production') throw new Error('SMTP is not configured'); return;} await transporter.sendMail({from:env.EMAIL_FROM,to,subject,html});}
