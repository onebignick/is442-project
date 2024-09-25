package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.Product;

public interface ProductRepository extends CrudRepository<Product, String>{}
