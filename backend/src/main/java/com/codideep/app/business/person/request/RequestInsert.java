package com.codideep.app.business.person.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestInsert {
	@NotBlank(message = "El campo \"firstName\" es requerido.")
	private String firstName;

	@NotBlank(message = "El campo \"surName\" es requerido.")
	private String surName;

	@NotBlank(message = "El campo \"dni\" es requerido.")
	private String dni;

	@NotNull(message = "El campo \"gender\" es requerido.")
	private boolean gender;

	@NotBlank(message = "El campo \"birthDate\" es requerido.")
	private String birthDate;
}