import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (userUNS) => {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);
  const typingTimeoutRef = useRef({});
  const [isConnected, setIsConnected] = useState(false);
  const messageQueue = useRef([]);

  const sendQueuedMessages = useCallback(() => {
    while (messageQueue.current.length > 0 && isConnected) {
      const message = messageQueue.current.shift();
      ws.current.send(message);
    }
  }, [isConnected]);

  useEffect(() => {
    ws.current = new WebSocket(`wss://socket.granularx.com/ws/${userUNS}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === 'send_message') {
          const newMessage = {
            id: Date.now(),
            sender: data.sender,
            content: data.content,
            timestamp: new Date().toISOString(),
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const timeouts = { ...typingTimeoutRef.current };
      Object.values(timeouts).forEach(clearTimeout);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userUNS]);

  useEffect(() => {
    if (isConnected) {
      sendQueuedMessages();
    }
  }, [isConnected, sendQueuedMessages]);

  const sendMessage = useCallback((receiverUNS, content) => {
    const messagePayload = JSON.stringify({
      action: 'send_message',
      receiver: receiverUNS,
      sender: userUNS,
      content: content,
    });
    if (isConnected && ws.current) {
      ws.current.send(messagePayload);
    } else {
      messageQueue.current.push(messagePayload);
    }
  }, [isConnected, userUNS]);

  const sendTransactionAlert = useCallback((receiverUNS, amount, senderName) => {
    const alertPayload = JSON.stringify({
      action: 'send_message',
      receiver: receiverUNS,
      sender: 'SYSTEM',
      content: `Transaction Alert: ₦${amount} from ${senderName}`,
    });
    if (isConnected && ws.current) {
      ws.current.send(alertPayload);
    } else {
      messageQueue.current.push(alertPayload);
    }
  }, [isConnected]);

  return { messages, sendMessage, sendTransactionAlert, isConnected };
};

export default useWebSocket;