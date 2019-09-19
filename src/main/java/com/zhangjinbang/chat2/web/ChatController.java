package com.zhangjinbang.chat2.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
	
	@GetMapping({"/chat","/","/index"})
	public String chatPage() {
		return "chat";
	}

}
