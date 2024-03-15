"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Rings } from 'react-loader-spinner'
import Link from "next/link";

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userId, setUserId] = useState("EM142");
  const [user, setUser] = useState(null);
  const [messageCount, setMessagecount] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/api/user", {
          params: {
            uin: userId,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [userId]);

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
        console.error("Error fetching Message Count:", error);
      }
    }

    fetchMessageCount();
  }, [userId]);

  return (
    <main>
      <div className="welcome">
        {user && messageCount ? (
          <div className="login">
            <dis className=" dialog-title">
              <h2>Hello {user.first_name}</h2>
            </dis>
            <dis className="dialog">
              <h4>
                You have {messageCount.unread} unread messages out of{" "}
                {messageCount.total} total
              </h4>
            </dis>
            <dis className="dialog-hidden">
              <Link className="link" href={`/inbox?userId=${userId}`}>
         
              <button className="btn-primary">
                View Messages <FaArrowRight />
              </button>
              </Link>
            </dis>
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
      </div>
    </main>
  );
}
