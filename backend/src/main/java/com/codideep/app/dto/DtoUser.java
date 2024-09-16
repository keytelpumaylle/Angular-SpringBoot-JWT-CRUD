package com.codideep.app.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class DtoUser {
	private String idUser;
	private String userName;
	private String password;
	private Date createdAt;
	private Date updatedAt;
}