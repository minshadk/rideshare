import { useState, useEffect, useRef } from "react";

import layout from "../layout.module.css";
import styles from "./styles.module.css";
import Chat from "../../components/chat/chat";

import paperClipImage from "../../assets/paperclip.png";
import sendImage from "../../assets/send.png";
import documentImage from "../../assets/document.png";
import photoImage from "../../assets/photo.png";
import videoImage from "../../assets/video.png";
import groupImage from "../../assets/group.png";
import back from "../../assets/back.png";
import dots from "../../assets/dots-vertical.png";
import edit from "../../assets/edit.png";

const SingleMessage = () => {
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message != "") {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const formattedMessages: {
        message: string;
        sender: { self: boolean };
        time: string;
      }[] = [];

      formattedMessages.push({
        message: message,
        sender: { self: true },
        time: time,
      });

      setFormattedMessages(formattedMessages);

      setMessage("");
    }
  };

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop === 0 &&
      !isLoading &&
      !reachedEnd
    ) {
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );
      const messages = await response.json();
      const chats = messages.chats;

      if (chats.length === 0) {
        setReachedEnd(true);
      } else {
        setFormattedMessages((prevMessages) => [...chats, ...prevMessages]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [formattedMessages]);

  return (
    <section className={layout.page}>
      <div className={layout.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <img src={back} className={styles.marginRight} />
            <h1 className={styles.headerText}>Trip 1</h1>
          </div>
          <img src={edit} className={styles.editIcon} alt="Edit" />
        </div>
        <div className={styles.headerWrapper}>
          <div className={`${styles.dFlex} `}>
            <img
              className={`${styles.avatar} ${styles.marginRight}`}
              src={groupImage}
              alt="Group"
            />
            <div>
              <span className={styles.mutedText}>From</span>
              <span className={styles.headerSubHeading}> IGI Airport, T3</span>
              <div>
                <span className={styles.mutedText}>To </span>
                <span className={styles.headerSubHeading}> Sector 28</span>
              </div>
            </div>
          </div>
          <img src={dots} className={styles.dotsIcon} alt="Dots" />
        </div>
        <div>
          <div className={styles.chatsContainer} ref={containerRef}>
            {formattedMessages.map((message) => (
              <Chat
                key={message.id}
                message={message.message}
                verified={message.sender.is_kyc_verified}
                self={message.sender.self}
                imageUrl={message.sender.image}
              />
            ))}
            {isLoading && <p>Loading...</p>}
            {reachedEnd && <p>No more messages.</p>}
          </div>
          <div className={styles.messageInputContainer}>
            <input
              className={styles.messageInput}
              type="text"
              id="message"
              name="message"
              onChange={handleMessage}
              value={message}
            />
            <div className={styles.dFlex}>
              {showTooltip && (
                <div className={`${styles.tooltipTip}  ${styles.top}`}>
                  <img src={photoImage} alt="Photo" />
                  <img src={videoImage} alt="Video" />
                  <img src={documentImage} alt="Document" />
                </div>
              )}
              <img
                src={paperClipImage}
                className={styles.tooltipWrapper}
                onClick={handleClick}
                alt="Attach"
              />
              <img src={sendImage} onClick={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMessage;
