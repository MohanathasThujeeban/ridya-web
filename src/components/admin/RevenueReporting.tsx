import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  DollarSign, 
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface RevenueData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
}

export function RevenueReporting() {
  const [period, setPeriod] = useState("monthly");

  const monthlyData: RevenueData[] = [
    { period: "January", revenue: 45231, expenses: 28450, profit: 16781, growth: 12.5 },
    { period: "February", revenue: 52180, expenses: 31200, profit: 20980, growth: 15.3 },
    { period: "March", revenue: 48920, expenses: 29800, profit: 19120, growth: 8.2 },
    { period: "April", revenue: 61500, expenses: 35600, profit: 25900, growth: 20.1 },
  ];

  const revenueStreams = [
    { name: "Ride Commissions", amount: 38420, percentage: 62.5, trend: "up", change: "+15%" },
    { name: "Subscription Fees", amount: 12300, percentage: 20.0, trend: "up", change: "+8%" },
    { name: "Cancellation Fees", amount: 6780, percentage: 11.0, trend: "down", change: "-3%" },
    { name: "Surge Pricing", amount: 4000, percentage: 6.5, trend: "up", change: "+25%" },
  ];

  const expenses = [
    { category: "Driver Payouts", amount: 28500, percentage: 80.0 },
    { category: "Platform Maintenance", amount: 3500, percentage: 9.8 },
    { category: "Marketing", amount: 2200, percentage: 6.2 },
    { category: "Support & Operations", amount: 1400, percentage: 4.0 },
  ];

  const totalRevenue = monthlyData[monthlyData.length - 1].revenue;
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses;
  const totalProfit = monthlyData[monthlyData.length - 1].profit;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Revenue Reporting</h2>
          <p className="text-gray-500 mt-1">Financial analytics and performance tracking</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+20.1%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-sm text-orange-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+18.5%</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <ArrowDownRight className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-gray-900">${totalProfit.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+22.8%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">{profitMargin}%</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+2.3%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stream.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={stream.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {stream.change}
                      </Badge>
                      <span className="font-bold">${stream.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stream.trend === "up" ? "bg-green-500" : "bg-orange-500"
                        }`}
                        style={{ width: `${stream.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {stream.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{expense.category}</span>
                    <span className="font-bold">${expense.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {expense.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Period</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Expenses</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Net Profit</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data) => (
                  <tr key={data.period} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{data.period}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-semibold">
                      ${data.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-red-600 font-semibold">
                      ${data.expenses.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-blue-600 font-semibold">
                      ${data.profit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={data.growth > 0 ? "default" : "secondary"}>
                        {data.growth > 0 ? "+" : ""}{data.growth}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg h-80 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Revenue Chart Visualization</p>
              <p className="text-sm text-gray-500 mt-2">
                Integration with Chart.js or Recharts for visual analytics
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
