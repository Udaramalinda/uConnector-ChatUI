import Chat from './components/chat/chat';
import Detail from './components/detail/detail';
import List from './components/list/list';
import Login from './components/login/login';
import Notification from './components/notification/notification';

import './App.css';

function App() {
  const user = true;
  return (
    <div className='App'>
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
