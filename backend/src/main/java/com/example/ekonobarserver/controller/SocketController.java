package com.example.ekonobarserver.controller;

import com.example.ekonobarserver.model.SocketOrder;
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

        simpMessagingTemplate.convertAndSendToUser(socketOrder.getReceiverIdentification(),"/socket-order" ,socketOrder);
        return socketOrder;
    }
}
