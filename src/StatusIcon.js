
const StatusIcon = (connected) => {
  return (
    <i class={connected? 'icon connected': 'icon'}></i>
  );
}

export default StatusIcon;