
import './StatusIcon.css'

const StatusIcon = ({children, connected}) => {
  return (
    <i className={connected? 'icon connected': 'icon'}>{children}</i>
  );
}

export default StatusIcon;