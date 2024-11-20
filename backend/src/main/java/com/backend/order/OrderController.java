package com.backend.order;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    private final OrderService orderService;
    
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/api/order/{id}")
    public Order getOrderById(@PathVariable String id) throws Exception {
        return orderService.findById(id);
    }

    @GetMapping("/api/order/customerid/{customer_id}")
    public List<Map<String, Object>> getOrderCustId(@PathVariable String customer_id) throws Exception {
        return orderService.findByCustId(customer_id);
    }

    @GetMapping("/api/orders")
    public Iterable<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/api/orders/price")
    public List<Map<String, Object>> getAllOrdersWithTotalPrice() {
        return orderService.getAllOrdersWithTotalPrice();
    }

    @PutMapping("/api/order")
    public Order updateOrder(@RequestBody Order order) throws Exception {
       return orderService.updateOneOrder(order);
    }

    @PostMapping("/api/order")
    public Order createOrder(@RequestBody Order order) throws Exception {
       return orderService.createOneOrder(order);
    }

    @DeleteMapping("/api/order")
    public String deleteOrder(@RequestBody Order order) throws Exception {
       return orderService.deleteOneOrder(order);
    }

    @GetMapping("/api/order/salestype/{salesType}")
    public List<Order> getSalesType(@PathVariable String salesType) throws Exception {
        return orderService.findBySalesType(salesType);
    }

    @GetMapping("/api/orders/date")
    public List<Map<String, Object>> getOrdersBySalesDate(@RequestParam String salesDate) {
        System.out.println("Received salesDate: " + salesDate);
        return orderService.getOrdersBySalesDate(salesDate);
    }

    @GetMapping("/api/orders/daterange")
    public List<Map<String, Object>> getOrdersByDateRange(@RequestParam String startDate, String endDate) {
        return orderService.getOrdersByDateRange(startDate, endDate);
    }
 
    // New GetMapping to retrieve orders with customer names
    @GetMapping("/api/orders/customer")
    public List<Map<String, Object>> getAllCustomerOrders() {
        return orderService.getAllCustomerOrders();
    }

    // New API endpoint for Dormant Customers
    // @GetMapping("/api/customers/dormant")
    // public List<Customer> getDormantCustomers() {
    //     return orderService.getDormantCustomers();
    // }

    @GetMapping("/api/orders/export")
    public ResponseEntity<?> exportOrders(
            @RequestParam(required = false) String salesDate,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String customerId) {
        try {
            String filePath = orderService.exportOrdersByFilters(salesDate, startDate, endDate, customerId);

            File file = new File(filePath);
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found");
            }

            FileSystemResource fileResource = new FileSystemResource(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=filtered_orders.csv");
            headers.add(HttpHeaders.CONTENT_TYPE, "text/csv");

            file.deleteOnExit();

            return new ResponseEntity<>(fileResource, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
