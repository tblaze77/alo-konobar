package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.model.SocketOrder;
import com.example.ekonobarserver.model.SocketResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/order")
    private SocketOrder receiveSocketOrder (@Payload SocketOrder socketOrder){
        System.out.println("Endpoint for socket order has been hit");
        simpMessagingTemplate.convertAndSendToUser(socketOrder.getReceiverIdentification(),"/socket-order" ,socketOrder);
        return socketOrder;
    }

    @MessageMapping("/response")
    private SocketResponse receiveSocketResponse (@Payload SocketResponse socketResponse){
        System.out.println("Endpoint for socket response has been hit");
        System.out.println(socketResponse.getOrderId());
        simpMessagingTemplate.convertAndSendToUser(socketResponse.getReceiverIdentification(),"/socket-response" ,socketResponse);
        return socketResponse;
    }
}
