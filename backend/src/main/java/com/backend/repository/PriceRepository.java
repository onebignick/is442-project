package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.Price;

public interface PriceRepository extends CrudRepository<Price, String>{}