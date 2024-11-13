package com.backend.customer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.util.List;

public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom {
    
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Customer> findOneTimeCustomers() {
        String sql = "SELECT c.* FROM is442_customer c " +
                "JOIN (SELECT customer_id FROM is442_order GROUP BY customer_id HAVING COUNT(*) = 1) o " +
                "ON c.id = o.customer_id";
        Query query = entityManager.createNativeQuery(sql, Customer.class);
        return query.getResultList(); 
    }
}
