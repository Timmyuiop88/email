

import { PrismaClient } from '@prisma/client'
import axios from "axios";
const prisma = new PrismaClient()
import { NextResponse,  } from 'next/server';

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('messageId')
    const  messageId  = query 
  
    if (!messageId) {
        return NextResponse.json({ error: 'receiversId parameter is missing' });
    }
  
       
        try {
            const messages = await prisma.messages.findUnique({
                where: {
                    messageId: messageId,
                  
                },
                include: {
                    user: true 
                }
               
            });
            console.log({
             
                messages
            })

            if (messages.isRead == false) {
                const updateUser = await prisma.messages.update({
                    where: {
                      messageId: messageId,
                    },
                    data: {
                      isRead: true,
                    },
                  })
            }
           
            
            return NextResponse.json({
                messages
            });
        
           
        } catch (error) {
            console.error('Error fetching Messages:', error);
          return  NextResponse.json({ error: 'Internal server error' });
        }
 
  }





