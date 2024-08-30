import React, { useEffect } from 'react';
interface TelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username?: string;
  }
  
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
const TelegramLogin = () => {
  useEffect(() => {
    // Load the Telegram script dynamically
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute('data-telegram-login', 'exlina_test_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.body.appendChild(script);

    // Define the onTelegramAuth function
    (window as any).onTelegramAuth = (user: TelegramUser) => {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    };

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
      delete (window as any).onTelegramAuth;
    };
  }, []);

  return (
    <div>
        <button>lalala</button>
      {/* The Telegram login button will be inserted here */}
    </div>
  );
};

export default TelegramLogin;
