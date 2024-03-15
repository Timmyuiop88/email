"use client";
import Image from "next/image";
import { Rings } from 'react-loader-spinner'
import axios from "axios";
import styles from "../page.module.css";
import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/navBar";

export default function Message() {
    const [messageCount, setMessagecount] = useState(null);
  const [messages, setMessages] = useState(null);
  const searchParams = useSearchParams();

  const messageId = searchParams.get("messageId");
  const userId = searchParams.get("userId");
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    async function fetchMessageCount() {
      try {
        const response = await axios.get("/api/getMessageCount", {
          params: {
            receiverId: userId,
          },
        });

        setMessagecount(response.data);
      } catch (error) {
        console.error("Error fetching Message :", error);
      }
    }

    fetchMessageCount();
  }, [userId]);
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get("/api/getMessage", {
          params: {
            messageId: messageId,
          },
        });

        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching Message :", error);
      }
    }

    fetchMessages();
  }, [messageId]);



  return (
    <main className="full">
      {messages && messageCount ? (
        <div className="main">
          <NavBar
            active={active}
            toggleActive={toggleActive}
            userId={userId}
            read={messageCount.read}
            total={messageCount.total}
            unread={messageCount.unread}
            
          />
          <div className="body">
            <div className={active ? "content active" : "content"}>
             
                <div  className='view'>
                  <div className="view-title">
                    <div className="inbox-avatar">
                      <FaRegUser />
                    </div>
                    <div className="view-subject">
                    <h3>{messages.messages.user.first_name} {messages.messages.user.last_name} </h3>
                    <h2> {"<"}{messages.messages.user.email}{">"}  </h2>
                      <h5>{messages.messages.subject}</h5>
                    </div>
                  </div>
                  <div className="view-text">
                  <p>{messages.messages.content}</p>
                  </div>
                
                </div>
           

              <span className="text"></span>
            </div>
          </div>
        </div>
      
      ) : (
        <Rings
        visible={true}
        height="80"
        width="80"
        color="#3561a4"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      )}
    </main>
  );
}
