package com.codideep.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codideep.app.dto.DtoUser;
import com.codideep.app.entity.TUser;
import com.codideep.app.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public DtoUser getLogin(String userName, String password) {
		TUser tUser = userRepository.getLogin(userName, password);

		if(tUser == null) {
			return null;
		}

		DtoUser dtoUser = new DtoUser();

		dtoUser.setIdUser(tUser.getIdUser());
		dtoUser.setUserName(tUser.getUserName());
		dtoUser.setCreatedAt(tUser.getCreatedAt());
		dtoUser.setUpdatedAt(tUser.getUpdatedAt());
		
		return dtoUser;
	}
}