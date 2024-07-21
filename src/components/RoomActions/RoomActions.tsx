import classes from "./RoomActions.module.css";
import { ReactComponent as CallIcon } from "../../assets/call-outline.svg";
import { ReactComponent as MicIcon } from "../../assets/mic-outline.svg";
import { ReactComponent as MicOffIcon } from "../../assets/mic-off-circle-outline.svg";

import Button from "../Button/Button";
import { RoomStatus } from "../../hooks/useRoom";

const RoomActions = ({
  connect,
  status,
  disconnect,
  muted,
  toggleMuted,
}: {
  connect: () => void;
  disconnect: () => void;
  status: RoomStatus;
  muted: boolean;
  toggleMuted: () => void;
}): JSX.Element => {
  return (
    <div className={classes.container}>
      {status === RoomStatus.WAIT && (
        <Button onClick={connect} color="green">
          <CallIcon width={36} color="white" />
        </Button>
      )}
      {status === RoomStatus.CONNECT && (
        <Button onClick={disconnect} color="red">
          <CallIcon width={36} color="white" />
        </Button>
      )}
      <Button onClick={toggleMuted} color={muted ? "gray" : "blue"}>
        <MicIcon width={38} color="white" />
      </Button>
    </div>
  );
};
export default RoomActions;
