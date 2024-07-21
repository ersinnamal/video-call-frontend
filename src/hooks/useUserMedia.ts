import { useEffect, useState } from "react";

const useUserMedia = ({ audio }: { audio: boolean }) => {
  const [localStream, setLocalStream] = useState(new MediaStream());

  useEffect(() => {
    const setLocalMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 480 },
            height: { ideal: 320 },
            facingMode: "user",
          },
          audio,
        });
        setLocalStream(mediaStream);
      } catch {
        setLocalStream(new MediaStream());
      }
    };
    setLocalMediaStream();
  }, [audio]);

  return { localStream };
};

export default useUserMedia;
