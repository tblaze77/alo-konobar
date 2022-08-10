package com.example.ekonobarserver.model;

import lombok.Data;

import java.util.Date;

@Data
public class SocketResponse {
    private String senderIdentification;
    private String receiverIdentification;
    private String message;
    private Date date;
}