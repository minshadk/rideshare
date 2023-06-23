import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
  // const [formattedMessages, setFormattedMessages] = useState([]);
  const [formattedMessages, setFormattedMessages] = useState<any[]>([]);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const [message, setMessage] = useState("");

  const containerRef = useRef(null);

  // const handleMessage = (event) => {
  //   setMessage(event.target.value);
  // };
  // const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
  //   setMessage(event.target.value);
  // };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // formattedMessages.push({
    //   message: message,
    //   sender: { self: true },
    //   time: time,
    // });

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

    setMessage("");
  };

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    fetchMessages();

    window.addEventListener("scroll", handleScroll);

    // const scrollToBottom = () => {
    //   const container = containerRef.current;
    //   container.scrollTop = container.scrollHeight;
    // };
    // const scrollToBottom = () => {
    //   const container = containerRef.current;
    //   if (container) {
    //     container.scrollTop = container.scrollHeight;
    //   }
    // };

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    scrollToBottom();
  }, []);

  // const handleScroll = () => {
  //   const scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   const scrollHeight =
  //     document.documentElement.scrollHeight || document.body.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight;

  //   if (
  //     scrollTop + clientHeight >= scrollHeight - 100 &&
  //     !isLoading &&
  //     !reachedEnd
  //   ) {
  //     fetchMessages();
  //     console.log("fetched");
  //     console.log(formattedMessages.length);
  //     console.log(formattedMessages);
  //   }
  // };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (
      containerRef.current &&
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      !reachedEnd
    ) {
      fetchMessages();
      console.log("fetched");
      console.log(formattedMessages.length);
      console.log(formattedMessages);
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
        setFormattedMessages((prevMessages) => [...prevMessages, ...chats]);
        console.log(formattedMessages);

        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={layout.page}>
      <div className={layout.container}>
        <div className={styles.header}>
          <div className={styles.header}>
            <Link to="/">
              <img src={back} className={styles.marginRight} />
            </Link>
            <h1>Trip 1 </h1>
          </div>
          <img src={edit} className={styles.editIcon} />
        </div>
        <div className={styles.headerWrapper}>
          <div className={`${styles.dFlex} `}>
            <img
              className={`${styles.avatar} ${styles.marginRight}`}
              src={groupImage}
            />
            <div>
              <span className={styles.mutedText}>From</span>
              <span className={styles.headerText}> IGI Airport, T3</span>
              <div className={styles.messageTime}>To Sector 28</div>
            </div>
          </div>
          <img src={dots} className={styles.dotsIcon} />
        </div>
        {/* Existing code */}
        <div className="chatsContainer" ref={containerRef}>
          {formattedMessages &&
            formattedMessages.map((message) => (
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
                <img src={photoImage} />
                <img src={videoImage} />
                <img src={documentImage} />
              </div>
            )}
            <img
              src={paperClipImage}
              className={styles.tooltipWrapper}
              onClick={handleClick}
            />
            <img src={sendImage} onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMessage;
