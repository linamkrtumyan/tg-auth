"use client";
import React, { useRef, useEffect, useState } from "react";
import "./styles.css";

interface TelegramLoginButtonProps {
  botName: string;
  buttonSize?: "large" | "medium" | "small";
  className?: string;
  cornerRadius?: string;
  requestAccess?: string;
  usePic?: boolean;
  dataOnauth?: (user: any) => void;
  dataAuthUrl?: string;
  lang?: string;
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
  botName,
  buttonSize = "large",
  className = "",
  cornerRadius,
  requestAccess = "write",
  usePic = true,
  dataOnauth,
  dataAuthUrl,
  lang = "en",
}) => {
  const [loader, setLoader] = useState(false);
  const instance = useRef<HTMLDivElement | null>(null);

  console.log("test");





  useEffect(() => {
    if (instance.current) {
      (window as any).TelegramLoginWidget = {
        dataOnauth: (user: any) => {
          if (dataOnauth) {
            dataOnauth(user);
          }
        },
      };
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?14";
      script.setAttribute("data-telegram-login", botName);
    //   script.setAttribute("data-size", buttonSize);
      if (cornerRadius) {
        script.setAttribute("data-radius", cornerRadius);
      }
      script.setAttribute("data-request-access", requestAccess);
      script.setAttribute("data-userpic", usePic ? "true" : "false");
      script.setAttribute("data-lang", lang);
      script.setAttribute("width", "400px");
      document.body.appendChild(script);

      if (dataAuthUrl) {
        script.setAttribute("data-auth-url", dataAuthUrl);
    
      } else {
      
        script.setAttribute(
          "data-onauth",
          "TelegramLoginWidget.dataOnauth(user)"
        );
      }
      script.async = true;
      instance.current.appendChild(script);

      setTimeout(() => {
        setLoader(true);
      }, 1000);
    }
  }, [
    botName,
    buttonSize,
    cornerRadius,
    requestAccess,
    usePic,
    dataAuthUrl,
    lang,
    dataOnauth,
  ]);

  return (
    <div className="mainclass">
      <div className="tg-main">
        {/* {loader ? (
          <div className="tg-logo1">
            <img
              style={{ width: "18px", height: "18px" }}
              src="https://static-00.iconduck.com/assets.00/telegram-icon-512x435-4ugjo4i4.png"
              alt="Telegram Logo"
            />
            <p
              style={{
                paddingLeft: "10px",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Connect via Telegram
            </p>
          </div>
        ) : (
          <div
            style={{
              height: "28px",
              width: "200px",
              justifySelf: "center",
            }}
          >
            <p
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Loading...
            </p>
          </div>
        )} */}
        <div ref={instance} className={className} />
      </div>
    </div>
  );
};

export default TelegramLoginButton;

const onAuth = (ctx: any) => {
  console.log(ctx);
};

export const BotButton: React.FC = () => {
  return (
    <TelegramLoginButton
      botName="exlina_test_bot"
      cornerRadius="4"
      className="tg-login-button"
      dataOnauth={onAuth}
    />
  );
};
