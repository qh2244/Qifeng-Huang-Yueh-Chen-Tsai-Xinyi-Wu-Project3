import "./closeFriend.css";

// eslint-disable-next-line react/prop-types
export default function CloseFriend({user}) {
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
