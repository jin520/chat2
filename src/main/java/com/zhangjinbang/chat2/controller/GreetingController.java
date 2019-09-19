package com.zhangjinbang.chat2.controller;

import java.security.Principal;

import javax.annotation.Resource;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;


import com.zhangjinbang.chat2.entity.ChatMessage;


@Controller
public class GreetingController {
	@Resource
	private SimpMessagingTemplate st;
	
	@MessageMapping("/hello")
    @SendTo("/topic/greetings") //客户端订阅的地址 /topic/greetings
    public ChatMessage greeting(ChatMessage charMessage){
		
        return charMessage;
        
    }
	
//	@MessageMapping("/hello")
//    public void greeting(ChatMessage charMessage,Principal princial){
//		System.out.println(princial.getName());
//        //st.convertAndSend("/topic/greetings",charMessage);   
//    }
	
	
	
	
}
