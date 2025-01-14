import './chatList.css';
import { useState, useEffect } from 'react';
import { useUserStore } from '../../../library/userStore';
import { useChatStore } from '../../../library/chatStore';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../library/firebase';

import AddUser from './addUser/addUser';

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState('');

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), (doc) => {
      let chatsData = doc.data().chats;
      chatsData.sort((a, b) => b.updatedAt - a.updatedAt);
      setChats(chatsData);
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat);
  };

  const filteredChats = chats.filter((c) =>
    c.receiverName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='./search.png' alt='' />
          <input
            type='text'
            placeholder='Search'
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? './minus.png' : './plus.png'}
          alt=''
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {filteredChats.map((chat) => (
        <div
          className='item'
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat.receiverAvatar || './avatar.png'} alt='' />
          <div className='texts'>
            <span>{chat.receiverName}</span>
            <p>
              {chat.lastMessage.split(' ').slice(0, 5).join(' ') +
                (chat.lastMessage.split(' ').length > 5 ? '...' : '')}
            </p>
          </div>
          <div className='time'>
            <p>
              {(() => {
                const messageDate = new Date(chat.updatedAt);
                const today = new Date();
                if (
                  messageDate.getDate() === today.getDate() &&
                  messageDate.getMonth() === today.getMonth() &&
                  messageDate.getFullYear() === today.getFullYear()
                ) {
                  return messageDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                } else {
                  return messageDate.toLocaleDateString();
                }
              })()}
            </p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
}
