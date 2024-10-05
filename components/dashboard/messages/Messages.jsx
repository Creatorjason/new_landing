"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Add, HambergerMenu, SearchNormal1 } from "iconsax-react";
import ChatView from "./ChatView";
import MessageItem from "./MessageItem";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useWebSocket from '@/hooks/useWebSocket';

const MessagesPage = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile }) => {
  const { data: session } = useSession();
  const [friendUns, setFriendUns] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [chatsData, setChatsData] = useState({});

  const handleNewMessage = useCallback((message) => {
    if (message && message.sender && message.content) {
      console.log("Received new message:", message);
      setChatsData(prevChats => ({
        ...prevChats,
        [message.sender]: {
          ...prevChats[message.sender],
          messages: [
            ...(prevChats[message.sender]?.messages || []),
            {
              id: Date.now(),
              content: message.content,
              sender: message.sender,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      }));
    }
  }, []);

  const { sendMessage } = useWebSocket(session?.user?.username, handleNewMessage);

  const handleSendMessage = useCallback((receiverUns, content) => {
    console.log("Sending message:", { receiverUns, content });
    if (typeof content !== 'string') {
      console.error("Invalid message content type:", typeof content);
      return;
    }
    sendMessage(receiverUns, content);
    handleNewMessage({ sender: session.user.username, content, receiver: receiverUns });
  }, [session, sendMessage, handleNewMessage]);

  const handleChatSelect = (friend) => {
    if (!chatsData[friend.uns]) {
      setChatsData(prev => ({
        ...prev,
        [friend.uns]: {
          id: friend.uns,
          name: friend.uns,
          uns: friend.uns,
          messages: []
        }
      }));
    }
    setSelectedChat(chatsData[friend.uns] || { id: friend.uns, name: friend.uns, uns: friend.uns, messages: [] });
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const fetchFriendList = async () => {
    if (session) {
      try {
        const response = await axios.post(`https://api.granularx.com/chat/friends?platform=web`, {
          uns: session.user.username,
        }, {
          headers: {
            'Authorization': `Bearer ${session.authToken}`,
            'x-csrf-token': session.csrfToken,
          },
        });

        const data = response.data.data;
        setFriendList(data); // Set the fetched list
      } catch (error) {
        console.error('Error fetching friend list:', error);
      }
    }
  };

  const addFriend = async () => {
    if (!friendUns) {
      toast.error('This field is required');
      return;
    }

    const data = {
      uns: session.user.username,
      friend_uns: friendUns,
    };

    const request = axios.post(
      'https://api.granularx.com/chat/add?platform=web', data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.authToken}`,
          'x-csrf-token': `${session.csrfToken}`,
        },
      }
    );

    toast.promise(
      request,
      {
        loading: 'Adding friend...',
        success: async (response) => {
          const data = response.data;
          if (data.status === 'SUCCESS') {
            await fetchFriendList(); // Call fetchFriendList after successful addition
            return 'Friend added successfully';
          }
        },
        error: (err) => {
          console.error('API request failed:', err);
          return 'An unexpected error occurred. Please try again later.';
        },
      }
    );
  };

  useEffect(() => {
    fetchFriendList(); // Fetch friend list on component mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full transition-all ease-in-out duration-200 rounded-lg bg-white dark:bg-[#1C2626] p-0 sm:p-2">
      <div className={`w-full sm:w-1/3 border-r border-gray-200 dark:border-gray-700 ${isMobile && selectedChat ? 'hidden' : 'block'}`}>
        <div className="p-4 border-r-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between py-2 sm:py-0">
            <h2 className="text-lg font-bold flex items-center gap-x-2">Messages <span className="bg-gray-50 dark:bg-[#141f1f] p-2 py-1 border rounded-md text-sm font-medium">{friendList.length}</span></h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden">
              <HambergerMenu size="20" color="#141f1f"/>
            </button>
          </div>

          <div className="py-4">
            <p className="text-sm font-medium mb-2">Add friend by UNS</p>
            <div className="border border-[#e6e6e6] dark:border-gray-700 rounded-md flex items-center overflow-hidden gap-x-2">
              <div className="pl-2">
                <SearchNormal1 size="18" color="#999999" />
              </div>
              <input type="text" value={friendUns} onChange={(e) => setFriendUns(e.target.value)} placeholder="Add by UNS..." className="bg-transparent outline-none flex-1 text-sm font-normal" />
              <button onClick={addFriend} className="bg-[#141f1f] text-white p-3">
                <Add size="18" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto h-dvh md:h-[calc(100vh-260px)] pl-0 md:pl-4">
          {friendList?.map((friend) => (
            <MessageItem 
              key={friend.uns}
              name={friend.uns}
              isSelected={selectedChat?.id === friend.uns}
              onClick={() => handleChatSelect(friend)}
            />
          ))}
        </div>
      </div>
      <div className={`w-full sm:w-2/3 ${isMobile && !selectedChat ? 'hidden' : 'block h-[90%] md:h-auto'}`}>
        {selectedChat ? (
          <ChatView 
            chat={selectedChat} 
            chatsData={chatsData} 
            onBack={handleBack} 
            selectedChat={selectedChat} 
            handleUpdateChat={handleSendMessage} // Pass send message handler
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">GranularX SuperDM</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send messages to your loved ones, make in-chat payments,
                <br />access endless services and more...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
