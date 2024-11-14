"use client"

import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Overview } from "@/components/sales/overview"

import { MainNav } from "@/components/sales/main-nav"
import { Search } from "@/components/sales/search"
import { UserNav } from "@/components/sales/user-nav"

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [totalNumSales, setTotalNumSales] = useState(0);
  const [totalAmtSales, setTotalAmtSales] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeTab, setActiveTab] = useState("count");

  useEffect(() => {
    const fetchOrders = async() => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders");
        const orders = response.data;
        setTotalNumSales(orders.length);
      } catch (error) {
        console.error("Error fetching orders: ", error)
      }
    };

    const fetchOrderPrices = async() => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders/price");
        const orders = response.data;
        const totalPriceSum = orders.reduce((sum, order) => sum + order.total_price, 0);
        setTotalAmtSales(totalPriceSum);

        const uniqueYears = Array.from(new Set(orders.map(order => new Date(order.sales_date).getFullYear()))).sort((a, b) => a - b);
        setYears(uniqueYears);

        if (uniqueYears.length > 0 && !selectedYear) {
          setSelectedYear(uniqueYears[uniqueYears.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching order prices: ", error);
      }
    };

    fetchOrders();
    fetchOrderPrices();
  }, []);

  useEffect(() => {
    if (totalNumSales > 0) {
      setAverageOrderValue(totalAmtSales / totalNumSales);
    }
  }, [totalAmtSales, totalNumSales])

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight"> Sales Dashboard </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div> */}

          <Tabs defaultValue="overview" className="space-y-4">
            {/* <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList> */}

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Number of Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold"> 
                      { totalNumSales }
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Amount of Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${ totalAmtSales.toFixed(2) }
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Order Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold"> 
                      ${ averageOrderValue.toFixed(2) }
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader className="flex items-center justify-between">
                      <CardTitle className="text-left">Overview</CardTitle>

                      <div className="flex items-center space-x-4">
                          <Select onValueChange={(value) => setSelectedYear(parseInt(value))} value={selectedYear?.toString()}>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                              <SelectContent>
                                  {years.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                          {year}
                                      </SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>

                          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                              <TabsList>
                                  <TabsTrigger value="count">Total Number</TabsTrigger>
                                  <TabsTrigger value="amount">Total Amount</TabsTrigger>
                              </TabsList>
                          </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview selectedYear={selectedYear} activeTab={activeTab} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle> View Order </CardTitle>
                    <CardDescription>
                      View individual customers.
                    </CardDescription>
                    <Search />

                  </CardHeader>
                  <CardContent>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}