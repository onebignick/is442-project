package com.backend.price;

import org.springframework.web.bind.annotation.*;

@RestController
public class PriceController {
    private final PriceService priceService;

    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @PostMapping("/api/price")
    public Price createPrice(@RequestBody Price price) throws Exception {
        return priceService.createOnePrice(price);
    }

    @GetMapping("/api/price/{id}")
    public Price getPriceById(@PathVariable String id) throws Exception {
        return priceService.findById(id);
    }

    @GetMapping("/api/price")
    public Iterable<Price> getAllPrice() throws Exception {
        return priceService.findAllPrice();
    }

    @PutMapping("/api/price")
    public Price updatePrice(@RequestBody Price price) throws Exception {
        return priceService.updateOnePrice(price);
    }

    @DeleteMapping("/api/price")
    public Price deletePrice(@RequestBody Price price) throws Exception {
        return priceService.deleteOnePrice(price);
    }
}
