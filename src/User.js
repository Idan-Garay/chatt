import 'User.css'

const User = ({user, selected, status, connected}) => {
  return (
    <div onClick={() => {}} class={selected ? 'user selected': 'user'}>
      <div class="description">
        <div class="name">
          { user.username} {user.self ? " (yourself)" : "" }
        </div>
        <div class="status">
          <status-icon connected={connected? 'user.connected': null} />{{ status }}
        </div>
      </div>
      {
        user.hasNewMessages
        ? <div class="new-messages">!</div>
        :null
      }
    </div>
  );
}

export default User;