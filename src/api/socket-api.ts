import { publicUrl } from "@/utils/publicUrl";
import { io, Socket } from "socket.io-client";

export class SocketApi {
    static socket: null | Socket = null;

    static createConnection(roomId: string | undefined) {
        if (roomId) {
            this.socket = io(publicUrl(), {
                reconnectionDelayMax: 10000,
                query: {
                    roomId: roomId,
                },
            });

            this.socket.on("connect", () => {
                console.log(`[>>>] CONNECTED`);
            });

            this.socket.on("disconnect", () => {
                console.log(`[>>>] DISCONNECT`);
            });
        } else {
            this.socket = io(publicUrl(), {
                reconnectionDelayMax: 10000,
            });

            this.socket.on("connect", () => {
                console.log(`>>> CONNECTED`);
            });

            this.socket.on("disconnect", () => {
                console.log(`>>> DISCONNECT`);
            });
        }
    }
}
