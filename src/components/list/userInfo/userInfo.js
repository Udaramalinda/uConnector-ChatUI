import './userInfo.css';

export default function UserInfo() {
  return (
    <div className='userInfo'>
      <div className="user">
        <img src="./logo.png" alt="" />
        <h2 className='userInfo-name'>{"µConnector"}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
}
