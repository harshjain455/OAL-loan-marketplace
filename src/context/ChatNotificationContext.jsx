import React, { createContext, useContext, useState } from "react";

const ChatNotificationContext = createContext({
  unreadCount: 0,
  setUnreadCount: () => {}
});

export const ChatNotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <ChatNotificationContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </ChatNotificationContext.Provider>
  );
};

export const useChatNotification = () => useContext(ChatNotificationContext);
