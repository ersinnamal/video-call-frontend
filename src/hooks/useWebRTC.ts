import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const rtcConfig: RTCConfiguration = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }],
};

const useWebRTC = ({ socket, localStream }: { socket: Socket; localStream?: MediaStream }) => {
  const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(rtcConfig));
  const [iceCandidates, setIceCandidates] = useState<RTCIceCandidate[]>([]);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>();

  const connect = useCallback(
    async (offer?: RTCSessionDescriptionInit) => {
      let description: RTCSessionDescription | RTCSessionDescriptionInit;

      if (offer) {
        peerConnection.setRemoteDescription(offer);
        description = await peerConnection.createAnswer();
        socket.emit("newAnswer", description);
      } else {
        description = await peerConnection.createOffer();
        socket.emit("newOffer", description);
      }
      await peerConnection.setLocalDescription(description);
    },
    [peerConnection]
  );

  const disconnect = useCallback(() => {
    peerConnection.close();
    setPeerConnection(new RTCPeerConnection());
  }, [peerConnection]);

  useEffect(() => {
    if (connectionState === "disconnected") disconnect();
  }, [connectionState, disconnect]);

  useEffect(() => {
    peerConnection.onicecandidate = (c) => {
      if (c.candidate) {
        setIceCandidates((p) => [...p, c.candidate as RTCIceCandidate]);
      }
    };
    peerConnection.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };
    peerConnection.onconnectionstatechange = (e) => {
      console.log(e.target);
      const target = e.target as RTCPeerConnection;
      setConnectionState(target.connectionState);
    };
  }, [peerConnection]);

  useEffect(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
    }
  }, [localStream, peerConnection]);

  useEffect(() => {
    socket.on("newAnswer", (data) => {
      if (connectionState !== "connected") {
        peerConnection.setRemoteDescription(data);
      }
    });
    socket.on("newCandidate", (data) => {
      peerConnection.addIceCandidate(data);
    });
    return () => {
      socket.removeListener("newAnswer");
      socket.removeListener("newCandidate");
    };
  }, [socket, peerConnection, connectionState]);

  useEffect(() => {
    if (peerConnection.remoteDescription) {
      iceCandidates.forEach((c) => {
        socket.emit("newCandidate", c);
      });
    }
  }, [iceCandidates, peerConnection.remoteDescription]);

  return {
    remoteStream,
    connect,
    disconnect,
    connectionState,
  };
};

export default useWebRTC;
