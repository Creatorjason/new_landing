import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (uns) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!uns) return;

    const ws = new WebSocket(`wss://socket.granularx.com/ws/${uns}`);

    ws.onopen = () => {
      // console.log('Connected to the server');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      // console.log('Received:', event.data);
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        setLastMessage({ raw: event.data });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error.message);
    };

    ws.onclose = () => {
      // console.log('Connection closed');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [uns]);

  const sendMessage = useCallback((action, sender, receiver, content) => {
    if (socket && isConnected) {
      const payload = JSON.stringify({
        action: action,
        sender: sender,
        receiver: receiver,
        content: content
      });
      socket.send(payload);
      // console.log('Sent:', payload);
    } else {
      console.warn('Cannot send message: WebSocket is not connected');
    }
  }, [socket, isConnected]);

  return { isConnected, lastMessage, sendMessage };
};

export default useWebSocket;