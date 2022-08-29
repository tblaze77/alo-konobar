import { useEffect, useState } from 'react';
import { over } from 'stompjs';
import { getSpecificBranchTable } from '../apis/BranchApis';
import SockJS from 'sockjs-client';
var stompClient = null;
export const useSocket = tableId => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [branchId, setBranchId] = useState(null);
  const [isAccepted, setIsAccepted] = useState(null);
  let potentialOrderId;
  useEffect(() => {
    getSpecificBranchTable(tableId).then(response => setBranchId(response.data.branch.id));
    registerTable();
  }, []);

  const registerTable = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.debug = () => {};
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log('you are connected!!');
    stompClient.subscribe('/user/' + tableId + '/socket-response', onResponseReceived);
  };

  const onResponseReceived = async payload => {
    var payloadData = JSON.parse(payload.body);
    setResponseMessage(payloadData.message);
    if (payloadData.message === 'Your order is on the way') {
      setIsAccepted(true);
      if (payloadData.orderId != null) {
        potentialOrderId = payloadData.orderId;
        console.log('usa san u if');
      }
      console.log(potentialOrderId);
    } else {
      setIsAccepted(false);
    }
    setTimeout(() => {
      if (payloadData.message === 'Your order is on the way') {
        setShouldRedirect(true);
      } else {
        setShouldRedirect(false);
      }
    }, 5000);
  };

  const changeResponseMessage = value => {
    setResponseMessage(value);
  };

  const onError = () => {
    console.log('error has occured');
  };

  const sendOrder = async (messageToSend, total) => {
    if (stompClient) {
      let chatMessage = {
        senderIdentification: tableId,
        receiverIdentification: branchId,
        items: messageToSend,
        total: total,
        date: null,
      };
      stompClient.send('/app/order', {}, JSON.stringify(chatMessage));
      console.log('order has been sent');
    }
  };

  const sendPaymentMethod = async paymentMethod => {
    console.log(potentialOrderId);
    if (stompClient) {
      let chatMessage = {
        senderIdentification: tableId,
        receiverIdentification: branchId,
        message: paymentMethod,
        orderId: potentialOrderId,
        date: null,
      };
      stompClient.send('/app/response', {}, JSON.stringify(chatMessage));
      console.log('payment method has been sent');
    }
  };

  return {
    sendOrder: sendOrder,
    responseMessage: responseMessage,
    shouldRedirect: shouldRedirect,
    sendPaymentMethod: sendPaymentMethod,
    changeResponseMessage: changeResponseMessage,
    isAccepted: isAccepted,
  };
};
