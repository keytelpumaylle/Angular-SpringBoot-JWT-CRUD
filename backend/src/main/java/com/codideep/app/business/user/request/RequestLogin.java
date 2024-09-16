package com.codideep.app.business.user.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestLogin {
	@NotBlank(message = "El campo \"userName\" es requerido.")
	private String userName;

	@NotBlank(message = "El campo \"password\" es requerido.")
	private String password;
}