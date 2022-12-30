import { useContext } from 'react';

import { SocketContext } from '../contexts/SocketContext';

const useSocket = () => useContext(SocketContext);
console.log("Yes")
export default useSocket;
