export interface Room {
  ownerId: number;
  roomId: number;
  offer: RTCSessionDescription;
}
