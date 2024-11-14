package com.backend.customer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.time.LocalDate;
import java.sql.Date;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    public List<Customer> findFrequentCustomers() {
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

        return query.getResultList();
    }

    @Override
    public List<Customer> findOccasionalCustomers() {
        LocalDate threeMonths = LocalDate.now().minusMonths(3);

        String sql = "SELECT c.* FROM is442_customer c " +
                "JOIN (SELECT customer_id FROM is442_order " +
                "WHERE sales_date >= :threeMonths " +
                "GROUP BY customer_id " +
                "HAVING COUNT(*) BETWEEN 3 AND 5) o " +
                "ON c.id = o.customer_id";

        Query query = entityManager.createNativeQuery(sql, Customer.class);
        query.setParameter("threeMonths", java.sql.Date.valueOf(threeMonths));
        return query.getResultList();
    }

    @Override
    public List<Object[]> findCustomerLifetimeSpending() {
        String sql = "SELECT o.customer_id, c.name, c.email, SUM(oi.quantity * (p.price::DOUBLE PRECISION)) AS lifetime_spending "
                +
                "FROM is442_order o " +
                "JOIN is442_order_line_item oi ON o.id = oi.order_id " +
                "JOIN is442_price p ON oi.price_id = p.id " +
                "JOIN is442_customer c ON o.customer_id = c.id " +
                "GROUP BY o.customer_id, c.name, c.email";

        Query query = entityManager.createNativeQuery(sql);

        return query.getResultList(); // [customer_id, name, email, lifetime_spending]
    }

    @Override
    public List<Customer> findReturningCustomers() {
        
        LocalDate oneYearAgo = LocalDate.now().minusYears(1);

        String sql = "SELECT c.* FROM is442_customer c " +
                "JOIN is442_order o ON c.id = o.customer_id " +
                "GROUP BY c.id " +
                "HAVING MAX(o.sales_date) < :oneYearAgo";

        Query query = entityManager.createNativeQuery(sql, Customer.class);
        query.setParameter("oneYearAgo", Date.valueOf(oneYearAgo));

        return query.getResultList();
    }
}
