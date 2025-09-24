package com.example.online.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.online.Entity.ContactMessage;
import com.example.online.Repository.ContactMessageRepository;

import java.util.List;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.admin.email}")
    private String adminEmail;

    public ContactMessage saveMessage(ContactMessage contactMessage) {
        // save to DB
        ContactMessage saved = contactMessageRepository.save(contactMessage);

        // send email to Admin
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("New Contact Message from " + saved.getName());
        message.setText("Name: " + saved.getName() + "\n" +
                        "Email: " + saved.getEmail() + "\n\n" +
                        "Message:\n" + saved.getMessage());
        mailSender.send(message);

        return saved;
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}

