import './User.css'
import StatusIcon from './StatusIcon';

const User = ({user, selected, onClick}) => {
  
  return (
    <div onClick={() => onClick(user)} className={selected ? 'user selected': 'user'}>
      <div className="description">
        <div className="name">
          { user.username} {user.self ? " (yourself)" : "" }
        </div>
        <div className="status">
          <StatusIcon connected={user.connected? 'user.connected': null} />
          { user.connected? 'online': 'offline'}
        </div>
      </div>
      {
        user.hasNewMessages
        ? <div className="new-messages">!</div>
        :null
      }
    </div>
  );
}

export default User;