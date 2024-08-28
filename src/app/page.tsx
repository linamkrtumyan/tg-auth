"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TelegramConnect } from "./TelegramConnect";
import { BotButton } from "./TestTg";

export default function Home() {
  let name = "exlina_test_bot"; // Это имя бота который вы ранее создавали в BotFather
  const handleBot = (user: any) => {
    console.log(user);
  };
  return (
    <main className={styles.main}>
      {/* <TelegramConnect
        botName={name}
        buttonSize="large" // "large" | "medium" | "small"
        cornerRadius={14} // 0 - 20
        usePic={false} // true | false
        dataOnauth={handleBot}
        className={styles.telegramBtn}
        
      /> */}

      <BotButton/>
    </main>
  );
}
