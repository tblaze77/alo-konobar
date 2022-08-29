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
  const [paymentMethodMessage, setPaymentMethodMessage] = useState(null);
  const [orderId, setOrderId] = useState(null);
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
    stompClient.subscribe('/user/' + user.branch.id + '/socket-order', onOrderReceived);
    stompClient.subscribe('/user/' + user.branch.id + '/socket-response', onPaymentMethodReceived);
  };

  const onPaymentMethodReceived = async payload => {
    let payloadData = JSON.parse(payload.body);
    setPaymentMethodMessage(payloadData.message);
    setOrderId(payloadData.orderId);
  };

  const onOrderReceived = async payload => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    const { data } = await getSpecificBranchTable(accessToken, payloadData.senderIdentification);
    setBranchTableSender(data);

    setIncomingOrder(payloadData.items);
  };

  const onError = () => {
    console.log('error has occured');
  };

  const sendMessage = async (messageToSend, orderId, branchTableId) => {
    if (stompClient) {
      let chatMessage = {
        senderIdentification: user.branch.id,
        receiverIdentification: branchTableId,
        message: messageToSend,
        orderId: orderId,
        date: null,
      };

      stompClient.send('/app/response', {}, JSON.stringify(chatMessage));
      console.log('message has been sent');
    }
  };

  return {
    table: branchTableSender,
    items: incomingOrder,
    sendMessage: sendMessage,
    paymentMethodMessage: paymentMethodMessage,
    orderId: orderId,
  };
};
