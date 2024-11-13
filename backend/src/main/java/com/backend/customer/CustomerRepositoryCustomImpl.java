package com.backend.customer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @Override
    public List<Customer> findCustomersWithMoreThan10PurchasesLastMonth() {
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfLastMonth = now.minusMonths(1).withDayOfMonth(1);
        LocalDate lastDayOfLastMonth = firstDayOfLastMonth.withDayOfMonth(firstDayOfLastMonth.lengthOfMonth());
        String startDate = firstDayOfLastMonth.format(DateTimeFormatter.ISO_DATE);
        String endDate = lastDayOfLastMonth.format(DateTimeFormatter.ISO_DATE);

        String sql = "SELECT c.* " +
                    "FROM is442_customer c " +
                    "JOIN is442_order o ON c.id = o.customer_id " +
                    "WHERE o.sales_date BETWEEN :startDate AND :endDate " +
                    "GROUP BY c.id " +
                    "HAVING COUNT(o.id) > 10";

        Query query = entityManager.createNativeQuery(sql, Customer.class);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);

        return (List<Customer>) query.getResultList();
    }
}
