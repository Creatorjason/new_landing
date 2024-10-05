import { useEffect, useRef, useState } from 'react';

const useWebSocket = (userUNS) => {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket(`wss://socket.granularx.com/ws/${userUNS}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      // console.log("Received WebSocket message:", event.data);
      try {
        const data = JSON.parse(event.data);
        // console.log("Parsed WebSocket data:", data);
        if (data.action === 'send_message') {
          const newMessage = {
            id: Date.now(),
            sender: data.sender,
            content: data.content,
            timestamp: new Date().toISOString(),
          };
          // console.log("New message in onmessage:", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
   
          ((prevChats) => {
            const chatToUpdate = prevChats.find(chat => chat.id === data.receiver);
            if (chatToUpdate) {
              return prevChats.map(chat => chat.id === chatToUpdate.id
                ? { ...chatToUpdate, messages: [...chatToUpdate.messages, newMessage] }
                : chat);
            }
            return prevChats;
          });
        }
        // console.log("Data Parsed! ", data)
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };     

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

  }, [userUNS, messages]);

  // Function to send message via WebSocket
  const sendMessage = (receiverUNS, content) => {
    if (ws.current) {
      const messagePayload = JSON.stringify({
        action: 'send_message',
        receiver: receiverUNS,
        sender: userUNS,
        content: content,
      });
      // console.log("Sending WebSocket message:", messagePayload);
      ws.current.send(messagePayload);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
