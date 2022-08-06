package com.example.ekonobarserver.model;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class SocketOrder {
    private String senderIdentification;
    private String receiverIdentification;
    private List<Item> items;
    private Date date;
}
