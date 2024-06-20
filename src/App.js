import Chat from './components/chat/chat';
import Detail from './components/detail/detail';
import List from './components/list/list';
import Login from './components/login/login';
import Notification from './components/notification/notification';

import './App.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './library/firebase';
import { useUserStore } from './library/userStore';
import { useChatStore } from './library/chatStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <div className='App'>
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
