import styles from "./styles.module.css";

type MessageProps = {
  userName: string;
  message: string;
  time: string;
  imageUrl: string;
};

const Message = ({ userName, message, time, imageUrl }: MessageProps) => {
  return (
    <div className={styles.messageWrapper}>
      <div className={styles.messages}>
        <img className={styles.messages} src={imageUrl} />
      </div>
      <div className={styles.col}>
        <div className={styles.row}>
          <h2 className={styles.userName}>{userName}</h2>
          <h6 className={styles.messageTime}>{time}</h6>
        </div>
        <div className={styles.row}>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
