package com.backend.price;

import org.springframework.stereotype.Service;

import com.backend.template.TemplateNotFoundException;

import java.util.Optional;

@Service
public class PriceService {
    private PriceRepository priceRepository;

    public PriceService(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    public Price findById(String id) throws PriceNotFoundException {
        Optional<Price> oPrice = priceRepository.findById(id);
        if (oPrice.isEmpty()) throw new PriceNotFoundException();

        return oPrice.get();
    }

    public Iterable<Price> findAllPrice() {
        return priceRepository.findAll();
    }

    public Price createOnePrice(Price price) throws PriceAlreadyExistsException {
        try {
            this.findById(price.getId());
        } catch (PriceNotFoundException e) {
            Price newPrice = this.priceRepository.save(price);
            return newPrice;
        }
        throw new PriceAlreadyExistsException();
    }

    public Price updateOnePrice(Price price) throws PriceNotFoundException {
            Price updatedPrice = this.findById(price.getId());
            updatedPrice = this.priceRepository.save(price);
            return updatedPrice;
    }

    public Price deleteOnePrice(Price price) throws PriceNotFoundException {
        Optional<Price> oPrice = priceRepository.findById(price.getId());
        if (oPrice.isEmpty()) {
            throw new PriceNotFoundException();
        }
        priceRepository.deleteById(price.getId());
        return oPrice.get();
    }
}
