

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse,  } from 'next/server';

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('receiverId')
    const  receiverId  = query 
  
    if (!receiverId) {
        return NextResponse.json({ error: 'receiversId parameter is missing' });
    }
  
       
        try {
            const Messages = await prisma.messages.findMany({
                include: {
                    user: true 
                },
                where: {
                    receiverId: receiverId,
                  
                }
            });
        

        
            const MessagesArray =    Object.values(Messages) 
            console.log({
             
                MessagesArray
            })
            return NextResponse.json({
                MessagesArray
            });
        
           
        } catch (error) {
            console.error('Error fetching Messages:', error);
          return  NextResponse.json({ error: 'Internal server error' });
        }
 
  }





