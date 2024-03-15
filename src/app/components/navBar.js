"use client";
import Image from "next/image";

import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { LuInbox } from "react-icons/lu";
import { BsSend } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";

import Link from "next/link";

export default function NavBar({ active, toggleActive, unread, read, total, userId}) {

  return (
   
  <div>


        <div className="top">
          <div className="">
            <button className="btn" onClick={toggleActive}>
              <IoMdMenu />
            </button>
          </div>

          <div className="top-bar">
            <div className="top-bar-title">
              <p>My Inbox</p>
            </div>
            <div className="top-bar-details">
              <p>
                <HiOutlineInboxArrowDown /> {total} Messages
              </p>
              <p>
                <HiOutlineInboxArrowDown /> {unread} Unread
              </p>
            </div>
            <div className="top-bar-search">
              <input
                type="text"
                name="search"
                placeholder="Search Mail"
                className="search"
              />
            </div>
          </div>
        </div>
        <div className={active ? "nav active" : "nav"}>
              <div className="logo-item">
                <button className="btn" onClick={toggleActive}>
                  <IoMdClose />
                </button>
                <div className="logo"></div>
              </div>

              <div className="nav-item">
                <Link className="link" href={`/inbox?userId=${userId}`}>
                  <div className="nav-btn">
                    <LuInbox /> <p>Inbox</p>
                  </div>
                </Link>
              </div>
              <div className="nav-item">
                <Link className="link" href={"/inbox"}>
                  <div className="nav-btn">
                    <BsSend /> <p>Sent</p>
                  </div>
                </Link>
              </div>
              <div className="nav-item">
            
                  <div className="nav-btn">
                    <FaRegStar /> <p>Starred</p>
                  </div>
            
              </div>
              <div className="nav-item"></div>
            </div>
       
            </div>
 
  );
}
