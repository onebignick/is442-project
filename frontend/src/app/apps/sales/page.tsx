// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Overview } from "@/components/sales/overview"

import { OrderDataTableCard } from "@/components/sales/OrderDataTableCard";
import { PurchasesOverviewCard } from "@/components/sales/PurchasesOverviewCard";
import { TotalNumberOfSalesCard } from "@/components/sales/TotalNumberOfSalesCard";
import { TotalAmountFromSalesCard } from "@/components/sales/TotalAmountFromSalesCard";
import { AverageOrderValue } from "@/components/sales/AverageOrderValue";
import { RecentOrdersCard } from "@/components/sales/RecentOrdersCard";

export default async function DashboardPage() {
  const allOrdersResponse = await fetch("http://localhost:8080/api/orders");
  const allOrders = await allOrdersResponse.json()

  const allOrderPricesResponse = await fetch("http://localhost:8080/api/orders/price");
  const allOrderPrices = await allOrderPricesResponse.json();

  const totalOrderValue = allOrderPrices.reduce((curSum: number, curOrder: any) => curSum + curOrder.total_price, 0)
  const averageOrderValue = totalOrderValue / allOrders.length;

  // const [totalNumSales, setTotalNumSales] = useState(0);
  // const [totalAmtSales, setTotalAmtSales] = useState(0);
  // const [averageOrderValue, setAverageOrderValue] = useState(0);

  // const [years, setYears] = useState([]);
  // const [selectedYear, setSelectedYear] = useState(null);
  // const [activeTab, setActiveTab] = useState("count");

  // useEffect(() => {


  //   const fetchOrders = async() => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/orders");
  //       const orders = response.data;
  //       setTotalNumSales(orders.length);
  //     } catch (error) {
  //       console.error("Error fetching orders: ", error)
  //     }
  //   };

  //   const fetchOrderPrices = async() => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/orders/price");
  //       const orders = response.data;
  //       const totalPriceSum = orders.reduce((sum, order) => sum + order.total_price, 0);
  //       setTotalAmtSales(totalPriceSum);

  //       const uniqueYears = Array.from(new Set(orders.map(order => new Date(order.sales_date).getFullYear()))).sort((a, b) => a - b);
  //       setYears(uniqueYears);

  //       if (uniqueYears.length > 0 && !selectedYear) {
  //         setSelectedYear(uniqueYears[uniqueYears.length - 1]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching order prices: ", error);
  //     }
  //   };

  //   fetchOrders();
  //   fetchOrderPrices();
  // }, []);

  // useEffect(() => {
  //   if (totalNumSales > 0) {
  //     setAverageOrderValue(totalAmtSales / totalNumSales);
  //   }
  // }, [totalAmtSales, totalNumSales])

  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      <TotalNumberOfSalesCard className={"col-span-4"} totalNumberSales={allOrders.length}/>
      <TotalAmountFromSalesCard className={"col-span-4"} totalAmountOfSales={totalOrderValue}/>
      <AverageOrderValue className={"col-span-4"} averageOrderValue={averageOrderValue}/>
      <RecentOrdersCard className={"col-span-4"} allOrders={allOrders}/>
      <PurchasesOverviewCard className="col-span-8" />
      <OrderDataTableCard className={"col-span-12"}/>
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
            </Card> */}
    </div>
  )
}