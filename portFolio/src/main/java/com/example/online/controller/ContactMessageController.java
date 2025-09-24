package com.example.online.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.online.Entity.ContactMessage;
import com.example.online.service.ContactMessageService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    // User submits contact form
    @PostMapping("/contact")
    public ContactMessage submitMessage(@RequestBody ContactMessage contactMessage) {
        return contactMessageService.saveMessage(contactMessage);
    }

    // Admin fetches all messages
    @GetMapping("/admin/contact")
    public List<ContactMessage> getAllMessages() {
        return contactMessageService.getAllMessages();
    }
}
