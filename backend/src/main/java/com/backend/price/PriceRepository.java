package com.backend.price;

import org.springframework.data.repository.CrudRepository;

public interface PriceRepository extends CrudRepository<Price, String> {
}