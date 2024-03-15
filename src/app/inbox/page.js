"use client";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import styles from "../page.module.css";
import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/navBar";

export default function Inbox() {
  const [messageCount, setMessagecount] = useState(null);
  const [messages, setMessages] = useState(null);
  const searchParams = useSearchParams();

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
        const response = await axios.get("/api/getMessages", {
          params: {
            receiverId: userId,
          },
        });

        setMessages(response.data.MessagesArray);
      } catch (error) {
        console.error("Error fetching Message :", error);
      }
    }

    fetchMessages();
  }, [userId]);

  return (
    <main className="full">
      {messageCount && messages ? (
        <div className="main">
          <NavBar
            active={active}
            userId={userId}
            toggleActive={toggleActive}
            read={messageCount.read}
            total={messageCount.total}
            unread={messageCount.unread}
          />
          <div className="body">
            <div className={active ? "content active" : "content"}>
              {messages
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((message, index) => (
                  <Link
                    className="link"
                    href={`/message?messageId=${message.messageId}&userId=${userId} `}
                  >
                    <div
                      className={message.isRead ? "inbox" : "inbox unread"}
                      key={index}
                    >
                      <div className="inbox-title">
                        <div className="inbox-avatar">
                          <FaRegUser />
                        </div>
                        <div className="inbox-subject">
                          <h3>
                            {message.user.first_name} {message.user.last_name}{" "}
                          </h3>
                          <h5>{message.subject}</h5>
                        </div>
                      </div>
                      <div className="inbox-text">
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </Link>
                ))}

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
