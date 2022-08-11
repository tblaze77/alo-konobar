import { useEffect, useState } from 'react';
import { over } from 'stompjs';
import { getSpecificBranchTable } from '../apis/BranchApis';
import SockJS from 'sockjs-client';
var stompClient = null;
export const useSocket = tableId => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [branchId, setBranchId] = useState(null);
  useEffect(() => {
    getSpecificBranchTable(tableId).then(response => setBranchId(response.data.branch.id));
    registerTable();
  }, []);

  const registerTable = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log('you are connected!!');
    stompClient.subscribe('/user/' + tableId + '/socket-response', onResponseReceived);
  };

  const onResponseReceived = async payload => {
    var payloadData = JSON.parse(payload.body);
    setResponseMessage(payloadData.message);
    setTimeout(() => {
      setShouldRedirect(true);
    }, 5000);
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
    if (stompClient) {
      let chatMessage = {
        senderIdentification: tableId,
        receiverIdentification: branchId,
        message: paymentMethod,
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
  };
};
