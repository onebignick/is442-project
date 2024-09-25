package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.User;

public interface UserRepository extends CrudRepository<User, String>{}