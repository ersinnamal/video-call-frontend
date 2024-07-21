import classes from "./Room.module.css";
import { useParams } from "react-router-dom";
import useRoom, { RoomStatus } from "../../hooks/useRoom";
import User from "../User/User";
import RoomActions from "../RoomActions/RoomActions";
import ShareButton from "../ShareButton/ShareButton";

const Room = (): JSX.Element => {
  const { roomId } = useParams();

  const {
    room,
    localStream,
    remoteStream,
    connectMeeting,
    status,
    disconnectMeeting,
    muted,
    setMuted,
  } = useRoom({
    roomId: roomId as string,
  });


  return (
    <div className={classes.outerContainer}>
      <ShareButton />
      <div className={classes.usersContainer}>
        <User mediaStream={localStream} muted />
        {status === RoomStatus.CONNECT && <User mediaStream={remoteStream} />}
      </div>
      <RoomActions
        status={status}
        connect={connectMeeting}
        disconnect={disconnectMeeting}
        toggleMuted={() => setMuted((p) => !p)}
        muted={muted}
      />
    </div>
  );
};

export default Room;
