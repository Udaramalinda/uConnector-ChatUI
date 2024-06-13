import './addUser.css';
import { useState } from 'react';
import { useUserStore } from '../../../../library/userStore';
import { upload } from '../../../../library/upload';
import { toast } from 'react-toastify';
import { chatUserRegister } from '../../../../services/chatuser.register.service';

export default function AddUser() {

  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserStore();

  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleChatUserRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { name, email, channel, channelId } = Object.fromEntries(formData);

    try {
      const imgUrl = await upload(avatar.file);

      const newUser = {
        name,
        email,
        channel,
        channelId,
        avatar: imgUrl,
        currentUser,
      };
      const response = await chatUserRegister(newUser);
      console.log(response);
      toast.success('User added successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='addUser'>
      <h2>Create an Account</h2>
      <form onSubmit={handleChatUserRegister}>
        <label htmlFor='file'>
          <img src={avatar.url || './avatar.png'} alt='' />
          Upload an image
        </label>
        <input
          type='file'
          id='file'
          style={{ display: 'none' }}
          onChange={handleAvatar}
        />
        <input type='text' placeholder='Name' name='name' />
        <input type='text' placeholder='Email' name='email' />
        <div className='radio-group'>
          <label className='radio-option'>
            <input type='radio' value='WHATSAPP' name='channel' />
            WhatsApp
          </label>
          <label className='radio-option'>
            <input type='radio' value='INSTAGRAM' name='channel' />
            Instagram
          </label>
          <label className='radio-option'>
            <input type='radio' value='MESSENGER' name='channel' />
            Messenger
          </label>
        </div>
        <input
          type='text'
          placeholder='ID for channel Ex: 94764964790'
          name='channelId'
        />
        <button disabled={loading}>{loading ? 'Loading' : 'Add User'}</button>
      </form>
    </div>
  );
}
