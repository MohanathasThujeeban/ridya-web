import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { 
  Activity, 
  DollarSign, 
  Users, 
  Car,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";

export function AdminOverview() {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "$45,231", 
      change: "+20.1%", 
      trend: "up",
      icon: DollarSign,
      color: "text-green-600 bg-green-100"
    },
    { 
      title: "Active Rides", 
      value: "127", 
      change: "+15.3%", 
      trend: "up",
      icon: Car,
      color: "text-blue-600 bg-blue-100"
    },
    { 
      title: "Total Users", 
      value: "2,543", 
      change: "+12.5%", 
      trend: "up",
      icon: Users,
      color: "text-purple-600 bg-purple-100"
    },
    { 
      title: "Active Drivers", 
      value: "89", 
      change: "-2.4%", 
      trend: "down",
      icon: Activity,
      color: "text-orange-600 bg-orange-100"
    },
  ];

  const recentActivity = [
    { id: 1, type: "ride", message: "New ride request from John Doe", time: "2 min ago" },
    { id: 2, type: "driver", message: "Driver Michael joined the platform", time: "15 min ago" },
    { id: 3, type: "payment", message: "Payment of $45.50 received", time: "23 min ago" },
    { id: 4, type: "alert", message: "SOS alert resolved - Trip #1234", time: "45 min ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Real-time metrics and system status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1 text-sm">
                  <TrendIcon 
                    className={`h-4 w-4 mr-1 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`} 
                  />
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">High Demand Area</p>
                  <p className="text-xs text-yellow-700">Downtown area experiencing high ride requests</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Activity className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">System Healthy</p>
                  <p className="text-xs text-green-700">All services operating normally</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
