package com.backend.order;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.customer.Customer;
import com.backend.customer.CustomerRepository;
import com.backend.orderLineItem.OrderLineItem;
import com.backend.orderLineItem.OrderLineItemRepository;
import com.backend.price.Price;
import com.backend.price.PriceRepository;


@Service
public class OrderService {
    private OrderRepository orderRepository;
    private OrderLineItemRepository orderLineItemRepository;
    private PriceRepository priceRepository;
    private CustomerRepository customerRepository; 


    public OrderService(OrderRepository orderRepository, OrderLineItemRepository orderLineItemRepository, PriceRepository priceRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.orderLineItemRepository = orderLineItemRepository;
        this.priceRepository = priceRepository;
        this.customerRepository = customerRepository;
    }
    public Order findById(String id) throws OrderNotFoundException {
        Optional<Order> oOrder = orderRepository.findById(id);
        if (oOrder.isEmpty()) throw new OrderNotFoundException();

        return oOrder.get();
    }

    public List<Order> findBySalesType(String salesType) throws OrderNotFoundException {
        List<Order> oOrder = orderRepository.findBySalesType(salesType);
        if (oOrder.isEmpty()) throw new OrderNotFoundException();
    
        return oOrder;
    }


    public List<Order> findByCustId(String customer_id) throws OrderNotFoundException {
        List<Order> order = orderRepository.findAllByCustomerId(customer_id);
        if (order.isEmpty()) throw new OrderNotFoundException();

        return order;
    }


    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOneOrder(Order order) throws OrderAlreadyExistsException {
        try {
            this.findById(order.getId());
        } catch (OrderNotFoundException e) {
            Order newOrder = this.orderRepository.save(order);
            return newOrder;
        }
        throw new OrderAlreadyExistsException();
    }

    public Order updateOneOrder(Order order) throws OrderNotFoundException {
        try {
            // Find the existing order
            Order updatedOrder = this.findById(order.getId());
            
            // Now update the fields that have changed
            updatedOrder.setAddress(order.getAddress());
            updatedOrder.setSalesDate(order.getSalesDate());
            updatedOrder.setSalesType(order.getSalesType());  // Use correct field name
            updatedOrder.setShippingMethod(order.getShippingMethod());
            // Add other fields that you want to update
            
            // Save the updated order
            return this.orderRepository.save(updatedOrder);
        } catch (OrderNotFoundException e) {
            // Handle case when order is not found
            throw new OrderNotFoundException();
        }
    }

    public String deleteOneOrder(Order order) {
        try {
            this.orderRepository.deleteById(order.getId());
            return "Order deleted";
        } catch (OrderNotFoundException e) {
            return "Order not found";
            //do nothing
        }

    }

    public List<Map<String, Object>> getAllOrdersWithTotalPrice() {
        List<Order> orders = (List<Order>) orderRepository.findAll();
        List<Map<String, Object>> ordersWithTotalPrices = new ArrayList<>();
            
        for (Order order : orders) {
            List<OrderLineItem> lineItems = orderLineItemRepository.findByOrderId(order.getId());
            
            // Calculate the total price for each order
            double totalPrice = lineItems.stream()
                    .mapToDouble(item -> {
                        Price price = priceRepository.findById(item.getPrice().getId())
                                .orElseThrow(() -> new RuntimeException("Price not found for id: " + item.getPrice().getId()));
                        return Double.parseDouble(price.getPrice()) * item.getQuantity();
                    })
                    .sum();
    
            Map<String, Object> orderWithTotalPrice = new HashMap<>();
            orderWithTotalPrice.put("order", order);
            orderWithTotalPrice.put("total_price", totalPrice);
    
            ordersWithTotalPrices.add(orderWithTotalPrice);
        }
    
        // Sort by total_price in descending order
        ordersWithTotalPrices.sort((o1, o2) -> {
            double totalPrice1 = (double) o1.get("total_price");
            double totalPrice2 = (double) o2.get("total_price");
            return Double.compare(totalPrice2, totalPrice1); // Sort in descending order
        });
    
        return ordersWithTotalPrices;
    }

    public List<Map<String, Object>> getOrdersBySalesDate(String salesDate) {
        List<Order> orders = orderRepository.findBySalesDate(salesDate); // find order by salesdate
        List<Map<String, Object>> ordersWithTotalPrices = new ArrayList<>();
    
        for (Order order : orders) {
            List<OrderLineItem> lineItems = orderLineItemRepository.findByOrderId(order.getId());
    
            double totalPrice = lineItems.stream()
                    .mapToDouble(item -> {
                        Price price = priceRepository.findById(item.getPrice().getId())
                                .orElseThrow(() -> new RuntimeException("Price not found for id: " + item.getPrice().getId()));
                        return Double.parseDouble(price.getPrice()) * item.getQuantity();
                    })
                    .sum();
    
            Map<String, Object> orderWithTotalPrice = new HashMap<>();
            orderWithTotalPrice.put("order", order);
            orderWithTotalPrice.put("total_price", totalPrice);
    
            ordersWithTotalPrices.add(orderWithTotalPrice);
        }
    
        return ordersWithTotalPrices;
    }

    public List<Map<String, Object>> getOrdersByDateRange(String startDate, String endDate) {
        List<Order> orders = orderRepository.findBySalesDateBetween(startDate, endDate); 
        List<Map<String, Object>> ordersWithTotalPrices = new ArrayList<>();
        
        for (Order order : orders) {
            List<OrderLineItem> lineItems = orderLineItemRepository.findByOrderId(order.getId());
            
            double totalPrice = lineItems.stream()
                    .mapToDouble(item -> {
                        Price price = priceRepository.findById(item.getPrice().getId())
                                .orElseThrow(() -> new RuntimeException("Price not found for id: " + item.getPrice().getId()));
                        return Double.parseDouble(price.getPrice()) * item.getQuantity();
                    })
                    .sum();
    
            Map<String, Object> orderWithTotalPrice = new HashMap<>();
            orderWithTotalPrice.put("order", order);
            orderWithTotalPrice.put("total_price", totalPrice);
    
            ordersWithTotalPrices.add(orderWithTotalPrice);
        }
    
        return ordersWithTotalPrices;
    }    


    // New Method to fetch orders with customer names (added back in)
    public List<Map<String, Object>> getAllCustomerOrders() {
        List<Order> orders = (List<Order>) orderRepository.findAll();
        List<Map<String, Object>> ordersWithCustomerName = new ArrayList<>();

        for (Order order : orders) {
            try {
                // Check if the order has a valid customer_id
                if (order.getCustomer() != null) {
                    // Fetch customer by ID
                    Customer customer = customerRepository.findById(order.getCustomer().getId())
                            .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomer().getId()));

                    Map<String, Object> orderWithCustomerName = new HashMap<>();
                    orderWithCustomerName.put("order", order);
                    orderWithCustomerName.put("customer_name", customer.getName());

                    ordersWithCustomerName.add(orderWithCustomerName);
                } else {
                    // Handle case where order does not have an associated customer
                    Map<String, Object> error = new HashMap<>();
                    error.put("error", "Order does not have a linked customer for order ID: " + order.getId());
                    ordersWithCustomerName.add(error);
                }
            } catch (Exception e) {
                // Log and handle any error related to fetching customer
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Error finding customer for order ID: " + order.getId() + " - " + e.getMessage());
                ordersWithCustomerName.add(error);
            }
        }

        return ordersWithCustomerName;
    }
    
}



