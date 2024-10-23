"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { HambergerMenu, SearchNormal1, ArrowDown2, ArrowUp2, UserAdd } from "iconsax-react";
import ChatView from "./ChatView";
import MessageItem from "./MessageItem";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useWebSocket from '@/hooks/useWebSocket';

// Memoize FriendsList component
const FriendsList = React.memo(({ friends, selectedChat, handleChatSelect, setChatID, setChatHistory, session }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState('auto');
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight + 'px' : '0px');
    }
  }, [isExpanded, friends]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="px-4 mb-2">
      <button 
        onClick={toggleExpand}
        className="w-full text-left px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-between"
      >
        <span className="text-sm font-medium">Your Friends</span>
        {isExpanded ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
      </button>
      <div 
        style={{ height: height, overflow: 'hidden', transition: 'height 0.3s ease-in-out' }}
        className="mt-2"
      >
        <div
          ref={contentRef}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {friends.map((friend) => (
            <MessageItem
              key={friend.uns}
              session={session}
              name={friend.uns}
              setChatID={setChatID}
              setChatHistory={setChatHistory}
              isSelected={selectedChat?.id === friend.uns}
              onClick={() => handleChatSelect(friend)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

FriendsList.displayName = 'FriendsList';

// Memoize SoftServantDropdown component
const SoftServantDropdown = React.memo(({ onSelectMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="px-4 mb-2">
      <button 
        onClick={toggleExpand}
        className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between transition-colors duration-300"
      >
        <span className="text-sm font-medium">Your Soft Servant</span>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ArrowDown2 size="16" />
        </div>
      </button>
      <div 
        style={{ height, overflow: 'hidden', transition: 'height 0.3s ease-in-out' }}
        className="mt-1"
      >
        <div ref={contentRef} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <button 
            onClick={() => onSelectMode('Errand')}
            className="w-full text-sm text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Errand Mode
          </button>
          <button 
            onClick={() => onSelectMode('Assistant')}
            className="w-full text-sm text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Assistant Mode
          </button>
        </div>
      </div>
    </div>
  );
});

SoftServantDropdown.displayName = 'SoftServantDropdown';

const MessagesPage = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile }) => {
  const { data: session } = useSession();
  const [friendUns, setFriendUns] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [chatsData, setChatsData] = useState({});
  const [chatHistory, setChatHistory] = useState(null);
  const [chatIdentifier, setChatID] = useState(null);
  const [showFriends, setShowFriends] = useState(true);
  const [softServantMode, setSoftServantMode] = useState(null);

  // Memoize handleNewMessage callback
  const handleNewMessage = useCallback((message) => {
    if (message && message.sender && message.content) {
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

  // Memoize handleSendMessage callback
  const handleSendMessage = useCallback((receiverUns, content) => {
    if (typeof content !== 'string') {
      console.error("Invalid message content type:", typeof content);
      return;
    }
    sendMessage(receiverUns, content);
    handleNewMessage({ sender: session.user.username, content, receiver: receiverUns });
  }, [session, sendMessage, handleNewMessage]);

  // Memoize handleChatSelect callback
  const handleChatSelect = useCallback((friend) => {
    setChatsData(prev => {
      if (!prev[friend.uns]) {
        return {
          ...prev,
          [friend.uns]: {
            id: friend.uns,
            name: friend.uns,
            uns: friend.uns,
            messages: []
          }
        };
      }
      return prev;
    });
    setSelectedChat(prev => prev?.id === friend.uns ? prev : { id: friend.uns, name: friend.uns, uns: friend.uns, messages: [] });
  }, []);

  const handleBack = () => {
    setSelectedChat(null);
  };

  // Memoize fetchFriendList function
  const fetchFriendList = useCallback(async () => {
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
        setFriendList(data);
      } catch (error) {
        console.error('Error fetching friend list:', error);
      }
    }
  }, [session]);

  // Use useMemo for complex calculations or filtering
  const sortedFriendList = useMemo(() => {
    return [...friendList].sort((a, b) => a.uns.localeCompare(b.uns));
  }, [friendList]);

  useEffect(() => {
    fetchFriendList();
  }, [fetchFriendList]);

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
      }, {
        style: {
          fontSize: '13px',
          fontWeight: '500'
        },
        position: 'top-center',
      }
    );
  };

  const toggleFriendsList = () => {
    setShowFriends(!showFriends);
  };

  const handleSelectSoftServantMode = (mode) => {
    setSoftServantMode(mode);
    setSelectedChat(null);
  };

  const handleBackFromSoftServant = () => {
    setSoftServantMode(null);
  };

  return (
    <div className="flex h-[calc(100vh-150px)] transition-all ease-in-out duration-200 rounded-lg bg-white dark:bg-[#1C2626] p-0 sm:p-2">
      <div className={`w-full sm:w-1/3 border-r border-gray-200 dark:border-gray-700 ${isMobile && (selectedChat || softServantMode) ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between py-2 sm:py-0">
            <h2 className="text-lg font-bold flex items-center gap-x-2">Messages <span className="bg-gray-50 dark:bg-[#141f1f] p-2 py-1 border rounded-md text-sm font-medium">{friendList.length}</span></h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden text-[#141f1f] dark:text-gray-50">
              <HambergerMenu size="20"/>
            </button>
          </div>

          <div className="mt-4 relative">
            <SearchNormal1 size="18" color="#999999" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Messages" 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-[#141f1f] text-sm"
            />
          </div>
        </div>

        <div className="py-4">
          <SoftServantDropdown onSelectMode={handleSelectSoftServantMode} />
          <div className="px-4 mb-2">
            <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium">Your Plugs</span>
              <ArrowDown2 size="16" />
            </button>
          </div>
          <FriendsList 
            friends={sortedFriendList}
            selectedChat={selectedChat}
            handleChatSelect={handleChatSelect}
            setChatID={setChatID}
            setChatHistory={setChatHistory}
            session={session}
          />
        </div>

        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <div className="mb-2 p-0.5 focus:border focus:border-gray-200 focus:dark:border-gray-700 overflow-hidden relative flex items-center justify-between border border-gray-400 dark:border-gray-700 rounded-full">
            <input
              type="text"
              placeholder="Enter friend's UNS"
              value={friendUns}
              onChange={(e) => setFriendUns(e.target.value)}
              className="w-full bg-transparent py-2 outline-none px-4 text-sm"
            />
            <button 
              onClick={addFriend}
              className="flex items-center justify-center bg-[#141f1f] text-white p-2 rounded-r-full"
            >
              <UserAdd size="20" />
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full sm:w-2/3 ${isMobile && !selectedChat && !softServantMode ? 'hidden' : 'block h-[90%] md:h-auto'}`}>
        {selectedChat ? (
          <ChatView 
            chat={selectedChat} 
            chatsData={chatsData} 
            onBack={handleBack}
            chatIdentifier={chatIdentifier}
            selectedChat={selectedChat} 
            handleUpdateChat={handleSendMessage}
            isSoftServantMode={false}
          />
        ) : softServantMode ? (
          <ChatView 
            chat={{ name: `${softServantMode} Mode`, id: softServantMode.toLowerCase() }}
            chatsData={{}}
            onBack={handleBackFromSoftServant}
            chatIdentifier={`softservant_${softServantMode.toLowerCase()}`}
            selectedChat={{ id: softServantMode.toLowerCase() }}
            handleUpdateChat={(receiverUns, content) => {
              // Handle soft servant messages here
              console.log(`Soft Servant ${softServantMode} Mode:`, content);
            }}
            isSoftServantMode={true}
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

export default React.memo(MessagesPage);
