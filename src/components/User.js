export default function User({ user, lastMessage, setSelectedUser }) {
  return (
    <div
      className="user border-0 shadow bg-gray-100 p-2"
      onClick={() => setSelectedUser(user)}
    >
      <b>{user.username}</b>
      {/* last message */}
    </div>
  );
}
