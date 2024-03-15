

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse,  } from 'next/server';

export  async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('uin')
    const  uin  = query 
  
    if (!uin) {
        return NextResponse.json({ error: 'UIN parameter is missing' });
    }
  
       
        try {
            const user = await prisma.users.findUnique({
                where: {
                    uin: uin 
                }
            });
            console.log(user)
            return NextResponse.json(user);
           
        } catch (error) {
            console.error('Error fetching user:', error);
          return  NextResponse.json({ error: 'Internal server error' });
        }
 
  }





