const LOCAL_STORAGE_KEY = 'chatMessages';

export const saveMessagesToLocalStorage = (uns, messages) => {
  const allChats = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  allChats[uns] = messages;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allChats));
};

export const getMessagesFromLocalStorage = (uns) => {
  const allChats = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  return allChats[uns] || [];
};

export const getAllChatsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
};