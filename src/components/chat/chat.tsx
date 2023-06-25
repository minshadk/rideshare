import styles from "./styles.module.css";

import verifiedImage from "../../assets/verified.png";

type ChatProps = {
  message: string;
  verified: boolean;
  self: boolean;
  imageUrl: string;
};

const Chat = ({ message, verified, self, imageUrl }: ChatProps) => {
  return (
    <div className={self ? styles.alignLeft : styles.alignRight}>
      <div className={`${styles.chatContainer} `}>
        <div>
          {self ? (
            ""
          ) : (
            <div
              className={styles.badge}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              {verified && (
                <img src={verifiedImage} className={styles.verified} />
              )}
            </div>
          )}
        </div>
        <div
          className={`${
            self ? styles.messageContainerSelf : styles.messageContainerOthers
          }`}
        >
          {message}{" "}
        </div>
      </div>
    </div>
  );
};

export default Chat;
