package com.backend.order;

// import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderRepository extends JpaRepository<Order, String> {
    // Additional query methods can be defined here if needed
    List<Order> findBySalesType(String salesType);
    List<Order> findAllByCustomerId(String customer_id);
    List<Order> findBySalesDate(String salesDate);
    List<Order> findBySalesDateBetween(String startDate, String endDate);
}
