

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse,  } from 'next/server';

export async function PATCH(req, res) {
    const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('messageId')
    const  messageId  = query 
  
    if (!messageId) {
        return NextResponse.json({ error: 'messageId parameter is missing' });
    }
  
       
        try {
            const updatedMessage = await prisma.messages.update({
                where: { messageId: messageId },
                data: { isRead: true }
            });
        
         
        } catch (error) {
            console.error('Error Reading message:', error);
          return  NextResponse.json({ error: 'Internal server error' });
        }
 
  }





