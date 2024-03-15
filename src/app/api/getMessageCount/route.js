

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
            const readMessages = await prisma.messages.count({
                where: {
                    receiverId: receiverId,
                    isRead: true
                }
            });
            const unreadMessages = await prisma.messages.count({
                where: {
                    receiverId: receiverId,
                    isRead: false
                }
            });


            console.log({
                read: readMessages,
                unread: unreadMessages,
                total : readMessages + unreadMessages
              
            })
            return NextResponse.json({
                read: readMessages,
                unread: unreadMessages,
                total : readMessages + unreadMessages
            });
           
        } catch (error) {
            console.error('Error fetching MessagesCount:', error);
          return  NextResponse.json({ error: 'Internal server error' });
        }
 
  }





