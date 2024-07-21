import { createRequestFunction } from "./utils";

export const createRoom = createRequestFunction<
  { roomId: string },
  { clientId: string }
>({
  method: "POST",
  path: "/room",
});

export const getRoom = createRequestFunction<
  { data: { roomId: number; ownerId: number; offer?: RTCSessionDescription } },
  { clientId: number }
>({
  method: "GET",
  path: "/room/:roomId",
});
