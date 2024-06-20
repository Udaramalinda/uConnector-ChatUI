import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { useUserStore } from '../../library/userStore';
import { useChatStore } from '../../library/chatStore';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../library/firebase';
import { uploadMessageAttachment } from '../../library/uploadMessageAttachment';
import { sendMessage } from '../../services/message.service';
import { toast } from 'react-toastify';
import { useChatMessageStore } from '../../library/chatMessageStore';

export default function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const [attachment, setAttachment] = useState({
    file: null,
    url: '',
    type: '',
  });

  const { currentUser } = useUserStore();
  const { chatId, chatDetails } = useChatStore();
  const { addChatMessages, clearChatMessages } = useChatMessageStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  useEffect(() => {
    console.log('It was run useEffecct');
    clearChatMessages();
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
      if (res.data().messages) {
        addChatMessages(res.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleAttachment = (e) => {
    if (e.target.files[0]) {
      setAttachment({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
        type: e.target.files[0].type,
      });
    }
  };

  const handleSend = async () => {
    if (text === '' && !attachment.file) return;

    let attachmentUrl = null;

    try {
      if (attachment.file) {
        attachmentUrl = await uploadMessageAttachment(
          attachment.file,
          attachment.type
        );
      }

      let messageType;
      let message;
      if (attachmentUrl) {
        message = attachmentUrl;
        if (
          attachment.type === 'image/jpeg' ||
          attachment.type === 'image/png'
        ) {
          messageType = 'IMAGE';
        } else if (attachment.type === 'video/mp4') {
          messageType = 'VIDEO';
        } else if (attachment.type === 'application/pdf') {
          messageType = 'DOCUMENT';
        } else {
          messageType = 'FILE';
        }
      } else {
        message = text;
        messageType = 'TEXT';
      }

      const messageData = {
        sendByMe: true,
        messageType,
        message,
        createdAt: new Date(),
      };

      const content = {
        messageData,
        chatDetails,
        currentUser,
      };

      const response = await sendMessage(content);
    } catch (err) {
      toast.error('Message not sent sucessfully!');
    } finally {
      setAttachment({
        file: null,
        url: '',
        type: '',
      });
      setText('');
    }
  };

  const createDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (today.toDateString() === messageDate.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const openAttachment = (url) => {
    window.open(url, '_blank');
  };

  // console.log(chat);

  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <img src={chatDetails?.receiverAvatar || './avatar.png'} alt='' />
          <div className='texts'>
            <span>{chatDetails?.receiverName}</span>
            <p>{chatDetails?.receiverChannel}</p>
          </div>
        </div>
        <div className='icons'>
          <img src='./phone.png' alt='' />
          <img src='./video.png' alt='' />
          <img src='./info.png' alt='' />
        </div>
      </div>

      <div className='center'>
        {chat?.messages?.map((message) => (
          <div
            className={message.sendByMe ? 'message own' : 'message'}
            key={message?.createAt}
          >
            {!message.sendByMe && (
              <img src={chatDetails?.receiverAvatar || './avatar.png'} alt='' />
            )}
            <div className='texts'>
              {message.messageType === 'IMAGE' && (
                <img
                  onClick={() => openAttachment(message.message)}
                  src={message.message}
                  alt=''
                />
              )}
              {message.messageType === 'VIDEO' && (
                <video
                  width='320'
                  height='240'
                  src={message.message}
                  controls
                />
              )}
              {message.messageType === 'DOCUMENT' && (
                // <iframe src={message.message} width='320' height='240'></iframe>
                <img
                  src='./document.png'
                  onClick={() => openAttachment(message.message)}
                  alt=''
                />
              )}
              {message.messageType === 'TEXT' && <p>{message.message}</p>}
              <span>{createDate(message.createdAt)}</span>
            </div>
          </div>
        ))}
        {attachment.url && (
          <div className='message own'>
            <div className='texts'>
              {(attachment.type === 'image/jpeg' ||
                attachment.type === 'image/png') && (
                <img src={attachment.url} alt='' />
              )}
              {attachment.type === 'video/mp4' && (
                <video width='320' height='240' src={attachment.url} controls />
              )}
              {attachment.type === 'application/pdf' && (
                <img src='./document.png' alt='' />
              )}
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>

      <div className='bottom'>
        <div className='icons'>
          <img src='./camera.png' alt='' />
          <img src='./mic.png' alt='' />
          <label htmlFor='file'>
            <img src='./attachment.png' alt='' />
          </label>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            onChange={handleAttachment}
          />
        </div>
        <input
          type='text'
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className='emoji'>
          <img
            src='./emoji.png'
            alt=''
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className='picker'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
