package com.example.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.entity.Product;

public interface ProductRepository extends CrudRepository<Product, String>{}
