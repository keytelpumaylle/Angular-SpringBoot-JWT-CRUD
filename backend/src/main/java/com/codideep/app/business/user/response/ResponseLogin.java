package com.codideep.app.business.user.response;

import com.codideep.app.business.ResponseGeneral;

public class ResponseLogin extends ResponseGeneral {
	public class Dto {
		public Object user;
	}

	public Dto dto;

	public ResponseLogin() {
		dto = new Dto();
	}
}