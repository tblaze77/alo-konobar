import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getSpecificBranchTable } from '../apis/BranchTableApi';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
var stompClient = null;
export const useSocket = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [branchTableSender, setBranchTableSender] = useState(null);
  useEffect(() => {
    registerBranch();
  }, []);

  const registerBranch = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log('you are connected!!');
    stompClient.subscribe('/user/' + user.branch.id + '/socket-order', onResponseReceived);
  };

  const onResponseReceived = async payload => {
    var payloadData = JSON.parse(payload.body);
    const { data } = await getSpecificBranchTable(accessToken, payloadData.senderIdentification);
    setBranchTableSender(data);

    setIncomingOrder(payloadData.items);
  };

  const onError = () => {
    console.log('error has occured');
  };

  return {
    table: branchTableSender,
    items: incomingOrder,
  };
};
