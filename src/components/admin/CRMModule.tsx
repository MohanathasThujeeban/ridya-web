import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { 
  Users, 
  Star, 
  MessageSquare,
  Gift,
  TrendingUp,
  Award,
  Search,
  Mail,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  totalSpent: number;
  loyaltyPoints: number;
  rating: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

interface Feedback {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "reviewed" | "resolved";
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  used: number;
  total: number;
  status: "active" | "expired" | "scheduled";
}

export function CRMModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers: Customer[] = [
    {
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      totalRides: 156,
      totalSpent: 3420,
      loyaltyPoints: 1560,
      rating: 4.8,
      tier: "gold"
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      totalRides: 89,
      totalSpent: 1890,
      loyaltyPoints: 890,
      rating: 4.9,
      tier: "silver"
    },
    {
      id: "C003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      totalRides: 234,
      totalSpent: 5670,
      loyaltyPoints: 2340,
      rating: 4.7,
      tier: "platinum"
    },
  ];

  const feedback: Feedback[] = [
    {
      id: "F001",
      customer: "John Doe",
      rating: 5,
      comment: "Excellent service! Driver was very professional and the car was clean.",
      date: "2024-01-05",
      status: "reviewed"
    },
    {
      id: "F002",
      customer: "Sarah Wilson",
      rating: 3,
      comment: "Driver took a longer route. Not satisfied with the fare.",
      date: "2024-01-06",
      status: "pending"
    },
    {
      id: "F003",
      customer: "Mike Johnson",
      rating: 5,
      comment: "Great app experience. Very smooth booking process.",
      date: "2024-01-07",
      status: "reviewed"
    },
  ];

  const promotions: Promotion[] = [
    {
      id: "P001",
      title: "New Year Special",
      description: "Get 20% off on your next 5 rides",
      discount: "20%",
      validUntil: "2024-01-31",
      used: 234,
      total: 500,
      status: "active"
    },
    {
      id: "P002",
      title: "Weekend Discount",
      description: "Save 15% on all weekend rides",
      discount: "15%",
      validUntil: "2024-02-28",
      used: 156,
      total: 1000,
      status: "active"
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">CRM Module</h2>
          <p className="text-gray-500 mt-1">Customer relationship and loyalty management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">2,543</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Promotions</p>
                <p className="text-2xl font-bold text-gray-900">{promotions.filter(p => p.status === "active").length}</p>
                <p className="text-xs text-gray-500 mt-1">2 running</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Feedback</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedback.filter(f => f.status === "pending").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Needs review</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different CRM sections */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customer Loyalty</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>

        {/* Customer Loyalty Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Database</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                          <p className="text-sm text-gray-500">{customer.phone}</p>
                        </div>
                      </div>
                      <Badge className={getTierColor(customer.tier)}>
                        {customer.tier.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total Rides</p>
                        <p className="font-semibold text-lg">{customer.totalRides}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Spent</p>
                        <p className="font-semibold text-lg">${customer.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Loyalty Points</p>
                        <p className="font-semibold text-lg flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          {customer.loyaltyPoints}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rating</p>
                        <p className="font-semibold text-lg flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {customer.rating}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{item.customer}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status === "pending" ? "destructive" : "default"}>
                          {item.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < item.rating 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{item.comment}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Respond</Button>
                      {item.status === "pending" && (
                        <Button size="sm">Mark as Reviewed</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Promotions</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Promotion
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Promotion</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="promo-title">Title</Label>
                        <Input id="promo-title" placeholder="Promotion title" />
                      </div>
                      <div>
                        <Label htmlFor="promo-desc">Description</Label>
                        <Textarea id="promo-desc" placeholder="Promotion description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="promo-discount">Discount</Label>
                          <Input id="promo-discount" placeholder="20%" />
                        </div>
                        <div>
                          <Label htmlFor="promo-valid">Valid Until</Label>
                          <Input id="promo-valid" type="date" />
                        </div>
                      </div>
                      <Button className="w-full">Create Promotion</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-full">
                          <Gift className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{promo.title}</p>
                          <p className="text-sm text-gray-500">{promo.description}</p>
                        </div>
                      </div>
                      <Badge variant={promo.status === "active" ? "default" : "secondary"}>
                        {promo.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-500">Discount</p>
                        <p className="font-semibold text-lg text-green-600">{promo.discount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valid Until</p>
                        <p className="font-semibold">{promo.validUntil}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Usage</p>
                        <p className="font-semibold">{promo.used} / {promo.total}</p>
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(promo.used / promo.total) * 100}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Duplicate</Button>
                      <Button size="sm" variant="destructive">Deactivate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
