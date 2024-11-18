package com.backend.price;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<Map<String, Object>> findAllPrice() {
        List<Price> prices = (List<Price>) priceRepository.findAll();
        return buildPriceDetails(prices);
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

    private List<Map<String, Object>> buildPriceDetails(List<Price> prices) {
        List<Map<String, Object>> priceDetails = new ArrayList<>();
        
        for (Price price : prices) {
            Map<String, Object> priceMap = new HashMap<>();
            priceMap.put("id", price.getId());
            priceMap.put("price", price.getPrice());
            priceMap.put("product_id", price.getProduct().getId());
            priceMap.put("product_name", price.getProduct().getName());
            priceDetails.add(priceMap);
        }
        
        return priceDetails;
    }

}
