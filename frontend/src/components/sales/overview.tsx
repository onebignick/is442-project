"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function Overview({ selectedYear, activeTab }) {
    const [monthlyDataCount, setMonthlyDataCount] = useState([
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ]);

    const [monthlyDataAmount, setMonthlyDataAmount] = useState([
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ]);
        
    useEffect(() => {
        const fetchMonthlySales = async() => {
            try {
                const response = await axios.get("http://localhost:8080/api/orders/price");
                const orders = response.data;

                const countTotals = Array(12).fill(0);
                const amountTotals = Array(12).fill(0);

                orders.forEach((order) => {
                    const date = new Date(order.sales_date);
                    const month = date.getMonth();
                    const year = date.getFullYear();

                    if (year === selectedYear) {
                        countTotals[month] += 1;
                        amountTotals[month] += order.total_price;    
                    }
                });

                const updatedCountData = monthlyDataCount.map((monthData, index) => ({
                    ...monthData,
                    total: countTotals[index],
                }));

                const updatedAmountData = monthlyDataAmount.map((monthData, index) => ({
                    ...monthData,
                    total: amountTotals[index],
                }));
                setMonthlyDataCount(updatedCountData);
                setMonthlyDataAmount(updatedAmountData);
            } catch (error) {
                console.error("Error fetching monthly sales data: ", error);
            }
        };

        if (selectedYear) {
            fetchMonthlySales();
        }

    }, [selectedYear]);
        
    const dataToDisplay = activeTab === "count" ? monthlyDataCount : monthlyDataAmount;

    return (
        <div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dataToDisplay}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => (activeTab === "amount" ? `$${value}` : value)} />
                    <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
