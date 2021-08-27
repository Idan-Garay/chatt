import { Children } from "react";

const StatusIcon = ({children, connected}) => {
  return (
    <i class={connected? 'icon connected': 'icon'}>{...children}</i>
  );
}

export default StatusIcon;