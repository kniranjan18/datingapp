import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const joinMatch = (matchId) => {
        if (socket) {
            socket.emit('join_match', matchId);
        }
    };

    const sendMessage = (messageData) => {
        if (socket) {
            socket.emit('send_message', messageData);
        }
    };

    const onReceiveMessage = (callback) => {
        if (socket) {
            socket.on('receive_message', callback);
        }
    };

    const offReceiveMessage = () => {
        if (socket) {
            socket.off('receive_message');
        }
    };

    const value = {
        socket,
        joinMatch,
        sendMessage,
        onReceiveMessage,
        offReceiveMessage,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
