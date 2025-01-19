import { io } from "socket.io-client";
import { useEffect } from "react";
var socket: any;
socket = io("http://localhost:8000/messages", { transports : ['websocket'] });
var socket_data: never[] = [];
useEffect(() => {
    socket.on("getMessages", (data: any) => {
        socket_data = data
    })
}, []);

export default socket_data;