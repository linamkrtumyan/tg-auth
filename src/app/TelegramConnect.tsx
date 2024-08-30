import React, { useRef, useEffect } from "react";
import "./styles.css";

export interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void;
    };
  }
}

export const TelegramConnect: React.FC<TelegramLoginButtonType> = ({
  wrapperProps,
  dataAuthUrl,
  usePic = false,
  botName,
  className,
  buttonSize = "large",
  dataOnauth,
  cornerRadius,
  requestAccess = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  console.log("test")


  const iframe = document.getElementById("telegram-login-exlina_test_bot") as HTMLIFrameElement | null;
  console.log(iframe,'iframe')
  const elmnt = iframe?.contentWindow?.document.getElementsByTagName("button")[0];
  console.log(elmnt,'elmnt')
  if (elmnt) {
    elmnt.style.backgroundColor = "red";
  }
  
  useEffect(() => {
    if (ref.current === null) return;

    if (
      typeof dataOnauth === "undefined" &&
      typeof dataAuthUrl === "undefined"
    ) {
      throw new Error(
        "One of these props should be defined: dataAuthUrl (redirect URL), dataOnauth (callback fn)."
      );
    }

    if (typeof dataOnauth === "function") {
      window.TelegramLoginWidget = {
        dataOnauth: (user: TelegramUser) => dataOnauth(user),
      };
    }

   

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", "14");
    }

    if (requestAccess) {
      script.setAttribute("data-request-access", "write");
    }

    script.setAttribute("data-userpic", usePic.toString());

    if (typeof dataAuthUrl === "string") {
      script.setAttribute("data-auth-url", dataAuthUrl);
    } else {
      script.setAttribute(
        "data-onauth",
        "TelegramLoginWidget.dataOnauth(user)"
      );
    }

    script.async = true;

    // Injecting the script into the iframe context
    const frameScript = document.createElement("script");
    frameScript.innerHTML = `
      document.addEventListener("DOMContentLoaded", function() {
        const loginWidget = document.getElementById('widget_login');
        if (loginWidget) {
          loginWidget.style.backgroundColor = "blue";
          loginWidget.style.fontSize = "20px";
        }
      });
    `;
    
    ref.current.appendChild(script);
    ref.current.appendChild(frameScript);
  }, [
    botName,
    buttonSize,
    cornerRadius,
    dataOnauth,
    requestAccess,
    usePic,
    ref,
    dataAuthUrl,
  ]);

  return (
    <div ref={ref} className={className} {...wrapperProps} />
  );
};

interface TelegramLoginButtonType {
  botName: string;
  usePic: boolean;
  className?: string;
  cornerRadius?: number;
  requestAccess?: boolean;
  wrapperProps?: any;
  dataOnauth?: (res: any) => void;
  dataAuthUrl?: string;
  buttonSize: "large" | "medium" | "small";
}
