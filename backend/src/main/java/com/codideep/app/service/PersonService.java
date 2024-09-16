package com.codideep.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codideep.app.dto.DtoPerson;
import com.codideep.app.entity.TPerson;
import com.codideep.app.repository.PersonRepository;

@Service
public class PersonService {
	@Autowired
	private PersonRepository personRepository;

	public boolean insert(DtoPerson dtoPerson) {
		dtoPerson.setIdPerson(UUID.randomUUID().toString());
		dtoPerson.setCreatedAt(new Date());
		dtoPerson.setUpdatedAt(new Date());

		TPerson tPerson = new TPerson();

		tPerson.setIdPerson(dtoPerson.getIdPerson());
		tPerson.setFirstName(dtoPerson.getFirstName());
		tPerson.setSurName(dtoPerson.getSurName());
		tPerson.setDni(dtoPerson.getDni());
		tPerson.setGender(dtoPerson.getGender());
		tPerson.setBirthDate(dtoPerson.getBirthDate());
		tPerson.setCreatedAt(dtoPerson.getCreatedAt());
		tPerson.setUpdatedAt(dtoPerson.getUpdatedAt());

		personRepository.save(tPerson);

		return true;
	}

	public List<DtoPerson> getAll() {
		List<TPerson> listTPerson = personRepository.findAll();

		List<DtoPerson> listDtoPerson = new ArrayList<>();

		for (TPerson tPerson : listTPerson) {
			DtoPerson dtoPerson = new DtoPerson();

			dtoPerson.setIdPerson(tPerson.getIdPerson());
			dtoPerson.setFirstName(tPerson.getFirstName());
			dtoPerson.setSurName(tPerson.getSurName());
			dtoPerson.setDni(tPerson.getDni());
			dtoPerson.setGender(tPerson.getGender());
			dtoPerson.setBirthDate(tPerson.getBirthDate());
			dtoPerson.setCreatedAt(tPerson.getCreatedAt());
			dtoPerson.setUpdatedAt(tPerson.getUpdatedAt());

			listDtoPerson.add(dtoPerson);
		}
		
		return listDtoPerson;
	}

	public boolean delete(String idPerson) {
		personRepository.deleteById(idPerson);

		return true;
	}

	public boolean update(DtoPerson dtoPerson) {
		dtoPerson.setUpdatedAt(new Date());

		Optional<TPerson> optionTPeson = personRepository.findById(dtoPerson.getIdPerson());

		if(!optionTPeson.isPresent()) {
			return false;
		}

		optionTPeson.get().setFirstName(dtoPerson.getFirstName());
		optionTPeson.get().setSurName(dtoPerson.getSurName());
		optionTPeson.get().setDni(dtoPerson.getDni());
		optionTPeson.get().setGender(dtoPerson.getGender());
		optionTPeson.get().setBirthDate(dtoPerson.getBirthDate());
		optionTPeson.get().setUpdatedAt(dtoPerson.getUpdatedAt());

		personRepository.save(optionTPeson.get());

		return true;
	}
}