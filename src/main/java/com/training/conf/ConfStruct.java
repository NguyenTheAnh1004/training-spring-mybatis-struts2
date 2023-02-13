package com.training.conf;

import javax.servlet.annotation.WebServlet;

import org.apache.struts2.dispatcher.ng.servlet.StrutsServlet;

@WebServlet(urlPatterns = { "*.do" })
public class ConfStruct extends StrutsServlet{
	private static final long serialVersionUID = 4919365268043339311L;
}
