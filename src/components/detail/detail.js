import './detail.css';
import { auth } from '../../library/firebase';
import { useChatStore } from '../../library/chatStore';
import { useState } from 'react';
import { useChatMessageStore } from '../../library/chatMessageStore';

export default function Detail() {
  const { chatDetails, resetChat } = useChatStore();
  const { imageMessages, documentMessages, videoMessages } =
    useChatMessageStore();

  const [isAboutUsVisible, setIsAboutUsVisible] = useState(true);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);
  const [isPhotosVisible, setIsPhotosVisible] = useState(false);
  const [isVideosVisible, setIsVideosVisible] = useState(false);
  const [isFilesVisible, setIsFilesVisible] = useState(false);

  // have to implement this function
  const handleDeleteChat = () => {
    console.log('Delete Chat');
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  const getFileNameFromUrl = (url) => {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const fileName = parts[parts.length - 1].split('?')[0];
    return fileName.substring(0, 40) + '...';
  };

  return (
    <div className='detail'>
      <div className='user'>
        <img src={chatDetails?.receiverAvatar || './avatar.png'} alt='' />
        <h2>{chatDetails?.receiverName}</h2>
        <p>{chatDetails?.receiverChannel}</p>
        <p>{chatDetails?.receiverChannelId}</p>
      </div>
      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Shared Photos</span>
            <img
              src={isPhotosVisible ? './arrowUp.png' : './arrowDown.png'}
              alt=''
              onClick={() => setIsPhotosVisible(!isPhotosVisible)}
            />
          </div>
          {isPhotosVisible && (
            <div className='photos'>
              {imageMessages.length > 5
                ? imageMessages
                    .slice(-5)
                    .reverse()
                    .map((msg) => (
                      <div className='photoItem' key={msg.createdAt}>
                        <div className='photoDetail'>
                          <img src={msg.message} alt='' />
                          <span>{getFileNameFromUrl(msg.message)}</span>
                        </div>
                        <a href={msg.message} download>
                          <img src='./download.png' alt='' className='icon' />
                        </a>
                      </div>
                    ))
                : imageMessages.reverse().map((msg) => (
                    <div className='photoItem' key={msg.createdAt}>
                      <div className='photoDetail'>
                        <img src={msg.message} alt='' />
                        <span>{getFileNameFromUrl(msg.message)}</span>
                      </div>
                      <img src='./download.png' alt='' className='icon' />
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Videos</span>
            <img
              src={isVideosVisible ? './arrowUp.png' : './arrowDown.png'}
              alt=''
              onClick={() => setIsVideosVisible(!isVideosVisible)}
            />
          </div>
          {isVideosVisible && (
            <div className='photos'>
              {videoMessages.length > 5
                ? videoMessages
                    .slice(-5)
                    .reverse()
                    .map((msg) => (
                      <div className='photoItem' key={msg.createdAt}>
                        <div className='photoDetail'>
                          <img src='./play.png' alt='' />
                          <span>{getFileNameFromUrl(msg.message)}</span>
                        </div>
                        <a href={msg.message} download>
                          <img src='./download.png' alt='' className='icon' />
                        </a>
                      </div>
                    ))
                : videoMessages.map((msg) => (
                    <div className='photoItem' key={msg.createdAt}>
                      <div className='photoDetail'>
                        <img src='./play.png' alt='' />
                        <span>{getFileNameFromUrl(msg.message)}</span>
                      </div>
                      <a href={msg.message} download>
                        <img src='./download.png' alt='' className='icon' />
                      </a>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
            <img
              src={isFilesVisible ? './arrowUp.png' : './arrowDown.png'}
              alt=''
              onClick={() => setIsFilesVisible(!isFilesVisible)}
            />
          </div>
          {isFilesVisible && (
            <div className='photos'>
              {documentMessages.length > 5
                ? documentMessages
                    .slice(-5)
                    .reverse()
                    .map((msg) => (
                      <div className='photoItem' key={msg.createdAt}>
                        <div className='photoDetail'>
                          <img src='./document.png' alt='' />
                          <span>{getFileNameFromUrl(msg.message)}</span>
                        </div>
                        <a href={msg.message} download>
                          <img src='./download.png' alt='' className='icon' />
                        </a>
                      </div>
                    ))
                : documentMessages.map((msg) => (
                    <div className='photoItem' key={msg.createdAt}>
                      <div className='photoDetail'>
                        <img src='./document.png' alt='' />
                        <span>{getFileNameFromUrl(msg.message)}</span>
                      </div>
                      <a href={msg.message} download>
                        <img src='./download.png' alt='' className='icon' />
                      </a>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className='option'>
          <div className='title'>
            <span>Privacy</span>
            <img
              src={isPrivacyVisible ? './arrowUp.png' : './arrowDown.png'}
              alt=''
              onClick={() => setIsPrivacyVisible(!isPrivacyVisible)}
            />
          </div>
          {isPrivacyVisible && (
            <div className='privacy'>
              <p>
                Your privacy is important to us. We value the trust you have
                placed in us, and are committed to protecting and safeguarding
                any personal information you give us. This document describes
                how we use and process your personal data and how we use
                cookies. It also tells you how you can contact us if you have
                questions about your personal information.
              </p>
            </div>
          )}
        </div>
        <div className='option'>
          <div className='title'>
            <span>About Us</span>
            <img
              src={isAboutUsVisible ? './arrowUp.png' : './arrowDown.png'}
              alt=''
              onClick={() => setIsAboutUsVisible(!isAboutUsVisible)}
            />
          </div>
          {isAboutUsVisible && (
            <div className='privacy'>
              <p>
                This project, named <strong>µConnector</strong>, is created by{' '}
                <strong>Udara Malinda Wijesinghe</strong>, an undergraduate of
                the <strong>Computer Science and Engineering department</strong>{' '}
                at the <strong>University of Moratuwa</strong>. µConnector is a
                versatile application designed to bridge the gap between various
                chat platforms such as{' '}
                <strong>
                  WhatsApp, Messenger, Instagram, Viber, and Telegram
                </strong>
                . Our aim is to provide a unified platform for seamless
                communication across these popular services. We are committed to
                continuously enhancing µConnector to cater to the evolving needs
                of our users.
              </p>
            </div>
          )}
        </div>
        <button onClick={handleDeleteChat}>{'Delete Chat'}</button>
        <button className='logout' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

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
</div>;
