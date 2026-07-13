import { PrismaClient, Role, UserStatus, RecordStatus } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();
async function main() {
 const passwordHash = await argon2.hash('Admin123!');
 const admin = await prisma.user.upsert({where:{email:'admin@project3.local'},update:{},create:{email:'admin@project3.local',passwordHash,firstName:'System',lastName:'Admin',role:Role.SUPER_ADMIN,status:UserStatus.ACTIVE,emailVerifiedAt:new Date()}});
 await prisma.record.upsert({where:{reference:'PRJ-001'},update:{},create:{title:'Platform launch',reference:'PRJ-001',description:'Initial project record',status:RecordStatus.ACTIVE,ownerId:admin.id,dueDate:new Date(Date.now()+86400000*30)}});
}
main().finally(()=>prisma.$disconnect());
