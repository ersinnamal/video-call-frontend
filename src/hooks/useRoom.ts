import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/authContext";
import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../utils/api";
import useWebRTC from "./useWebRTC";
import { useNavigate } from "react-router-dom";

export enum RoomStatus {
  WAIT,
  CONNECT,
}

const useRoom = ({ roomId }: { roomId: string }) => {
  const navigate = useNavigate();

  const { data: room, status: fetchStatus } = useQuery({
    queryKey: ["get-room", roomId],
    queryFn: () => getRoom({ params: { roomId } }),
  });

  const [status, setStatus] = useState(RoomStatus.WAIT);
  const [muted, setMuted] = useState<boolean>(false);

  const { clientId } = useContext(AuthContext);

  const socket = useMemo(
    () => io(process.env.REACT_APP_HOST as string, { auth: { clientId, roomId } }),
    [clientId, roomId]
  );

  const [localStream, setLocalStream] = useState<MediaStream>();

  const { remoteStream, connect, disconnect } = useWebRTC({
    localStream,
    socket,
  });

  useEffect(() => {
    const track = localStream?.getAudioTracks()[0];
    if (track) track.enabled = !muted;
  }, [muted, localStream]);

  useEffect(() => {
    const setLocalMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 480 },
            height: { ideal: 320 },
            facingMode: "user",
          },
          audio: true,
        });
        setLocalStream(mediaStream);
      } catch {
        setLocalStream(new MediaStream());
      }
    };
    setLocalMediaStream();
  }, []);

  const connectMeeting = useCallback(async () => {
    await connect(room?.data.offer);
    setStatus(RoomStatus.CONNECT);
  }, [room, connect]);

  const disconnectMeeting = useCallback(async () => {
    await disconnect();
    setStatus(RoomStatus.WAIT);
  }, [disconnect]);

  useEffect(() => {
    if (fetchStatus === "error" || (room && !room.data)) {
      navigate("/");
    }
  }, [room, fetchStatus, navigate]);

  return {
    room,
    localStream,
    remoteStream,
    connectMeeting,
    status,
    disconnectMeeting,
    muted,
    setMuted,
  };
};

export default useRoom;
