package com.codideep.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codideep.app.entity.TPerson;

public interface PersonRepository extends JpaRepository<TPerson, String> { }