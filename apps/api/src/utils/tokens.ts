import jwt from 'jsonwebtoken'; import crypto from 'node:crypto'; import {env} from '../config/env.js';
export const randomToken=()=>crypto.randomBytes(48).toString('base64url'); export const hashToken=(v:string)=>crypto.createHash('sha256').update(v).digest('hex');
export const accessToken=(u:{id:string;role:string;email:string})=>jwt.sign(u,env.JWT_ACCESS_SECRET,{expiresIn:'15m'});
export const refreshToken=(u:{id:string})=>jwt.sign({sub:u.id},env.JWT_REFRESH_SECRET,{expiresIn:'30d'});
export const verifyAccess=(t:string)=>jwt.verify(t,env.JWT_ACCESS_SECRET) as {id:string;role:any;email:string}; export const verifyRefresh=(t:string)=>jwt.verify(t,env.JWT_REFRESH_SECRET) as {sub:string};
