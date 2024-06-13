import './detail.css';
import { auth } from '../../library/firebase';
import { useUserStore } from '../../library/userStore';
import { useChatStore } from '../../library/chatStore';

export default function Detail() {
  const { chatId, chatDetails, resetChat } = useChatStore();
  const { currentUser } = useUserStore();

  // have to implement this function
  const handleDeleteChat = () => {
    console.log('Delete Chat');
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className='detail'>
      <div className='user'>
        <img src={chatDetails?.receiverAvatar || "./avatar.png"} alt="" />
        <h2>{chatDetails?.receiverName}</h2>
        <p>{chatDetails?.receiverChannel}</p>
      </div>
      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Privacy & help</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared photos</span>
            <img src='./arrowDown.png' alt='' />
          </div>
          <div className='photos'>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt=''
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src='./download.png' alt='' className='icon' />
            </div>
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
            <img src='./arrowUp.png' alt='' />
          </div>
        </div>
        <button
        onClick={handleDeleteChat}
        >
          {'Delete Chat'}
        </button>
        <button className='logout' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
