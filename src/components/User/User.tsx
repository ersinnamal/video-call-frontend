import { useEffect, useRef } from "react";
import classes from "./User.module.css";

const User = ({
  mediaStream,
  muted = false,
}: {
  mediaStream?: MediaStream;
  muted?: boolean;
}): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className={classes.container}>
      <video ref={videoRef} autoPlay muted={muted} className={classes.video} />
    </div>
  );
};

export default User;
