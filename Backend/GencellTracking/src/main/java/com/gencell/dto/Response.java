package com.gencell.dto;

public class Response {

	public final static String OK = "ok";
	public final static String FAIL = "fail";

	private String status;
	private Object message;

	public Response(String status, Object message) {
		this.status = status;
		this.message = message;
	}

	public Response() {
		this(null, null);
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public Object getMessage() {
		return message;
	}
	
	public void setMessage(Object message) {
		this.message = message;
	}

}
