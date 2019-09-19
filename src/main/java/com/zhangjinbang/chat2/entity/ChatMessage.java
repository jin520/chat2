package com.zhangjinbang.chat2.entity;

public class ChatMessage {

	private String message;
	private String nickname;
	private String guidCode;

	public String getGuidCode() {
		return guidCode;
	}



	public void setGuidCode(String guidCode) {
		this.guidCode = guidCode;
	}



	public ChatMessage() {
	}

	

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}



	public String getMessage() {
		return message;
	}



	public void setMessage(String message) {
		this.message = message;
	}

}
