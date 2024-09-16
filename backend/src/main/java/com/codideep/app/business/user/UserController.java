package com.codideep.app.business.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codideep.app.business.user.request.RequestLogin;
import com.codideep.app.business.user.response.ResponseLogin;
import com.codideep.app.dto.DtoUser;
import com.codideep.app.service.UserService;
import com.codideep.app.settings.JwtUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "login", consumes = { "multipart/form-data" })
    public ResponseEntity<ResponseLogin> actionLogin(@Valid @ModelAttribute RequestLogin soLogin, BindingResult bindingResult) {
        ResponseLogin responseLogin = new ResponseLogin();

        DtoUser dtoUser = userService.getLogin(soLogin.getUserName(), soLogin.getPassword());
		
        if (dtoUser == null) {
			responseLogin.addResponseMesssage("Usuario o contraseña incorrecta.");
            return new ResponseEntity<>(responseLogin, HttpStatus.OK);
        }
		
        Map<String, Object> map = new HashMap<>();
        map.put("idUser", dtoUser.getIdUser());
        map.put("userName", dtoUser.getUserName());
		String token = JwtUtil.generateToken(dtoUser.getUserName());
		map.put("token", token);

        responseLogin.dto.user = map;
        responseLogin.addResponseMesssage("Bienvenido(a) al sistema.");
        responseLogin.success();

        return new ResponseEntity<>(responseLogin, HttpStatus.OK);
    }
}
