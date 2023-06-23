import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import layout from "../layout.module.css";
import styles from "./styles.module.css";

import Message from "../../components/Message/Message";

const AllMessages = () => {
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);

  useEffect(() => {
    const convertTo12HourFormat = (time: string): string => {
      const date = new Date(time);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    };

    const fetchAllMessages = async () => {
      try {
        const response = await fetch(
          "https://qa.corider.in/assignment/chat?page=0"
        );

        const messages = await response.json();
        const chats = messages.chats;

        chats.sort(function (a: any, b: any) {
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);
          return timeB.getTime() - timeA.getTime();
        });

        chats.forEach((chat: any) => {
          chat.time = convertTo12HourFormat(chat.time);
        });

        setFormattedMessages(chats);
        console.log(chats);
        console.log(formattedMessages); // Will show the previous state, as state updates are asynchronous
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, []);

  return (
    <section className={layout.page}>
      <div className={layout.container}>
        {formattedMessages &&
          formattedMessages.map((message) => (
            <Link
              to="/message/:id"
              // className={styles.link}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Message
                userName={"User Name"}
                message={message.message}
                time={message.time}
                imageUrl={message.sender.image}
              />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default AllMessages;
