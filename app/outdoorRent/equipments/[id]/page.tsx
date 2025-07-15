"use client";

import { addDays, differenceInDays, format, isAfter, isBefore } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Shield,
  Star,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { placeRentOrder } from "@/services/outdoorService";
// Sample equipment data - in a real app, this would come from an API
const equipmentData = {
  1: {
    id: 1,
    name: "4-Person Tent",
    category: "Camping",
    type: "Tents",
    price: 25,
    location: "Denver, CO",
    condition: "excellent",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "This spacious 4-person tent is perfect for family camping trips or group adventures. Features waterproof construction, easy setup, and excellent ventilation.",
    longDescription:
      "Our premium 4-person tent combines comfort, durability, and ease of use. The tent features a full rainfly for complete weather protection, color-coded poles for quick setup, and multiple storage pockets to keep your gear organized. The spacious interior provides plenty of room for four people to sleep comfortably, while the vestibule area offers additional storage space for boots and equipment.",
    specifications: {
      Capacity: "4 people",
      Weight: "12 lbs",
      "Packed Size": '24" x 8" x 8"',
      "Floor Area": "64 sq ft",
      "Peak Height": "6 ft",
      Material: "75D Polyester",
      "Waterproof Rating": "3000mm",
      "Setup Time": "10 minutes",
    },
    features: [
      "Waterproof and windproof",
      "Color-coded poles for easy setup",
      "Multiple storage pockets",
      "Vestibule for gear storage",
      "Excellent ventilation system",
      "Includes stakes and guylines",
    ],
    rating: 4.8,
    reviewCount: 127,
    unavailableDates: [
      new Date(2024, 11, 15), // Dec 15, 2024
      new Date(2024, 11, 16), // Dec 16, 2024
      new Date(2024, 11, 17), // Dec 17, 2024
      new Date(2024, 11, 25), // Dec 25, 2024
      new Date(2024, 11, 26), // Dec 26, 2024
      new Date(2025, 0, 1), // Jan 1, 2025
      new Date(2025, 0, 2), // Jan 2, 2025
    ],
  },
};

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-10-15",
    comment:
      "Excellent tent! Very easy to set up and stayed completely dry during a heavy rainstorm. Highly recommend for family camping.",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-09-28",
    comment:
      "Great quality tent with plenty of space. The color-coded poles made setup a breeze. Will definitely rent again!",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-09-10",
    comment:
      "Good tent overall. Spacious and well-made. Only minor issue was that one of the zippers was a bit sticky, but didn't affect functionality.",
  },
];

// Related equipment
const relatedEquipment = [
  {
    id: 2,
    name: "Sleeping Bag",
    price: 15,
    image: "/placeholder.svg?height=200&width=300",
    condition: "good",
  },
  {
    id: 3,
    name: "Portable Stove",
    price: 12,
    image: "/placeholder.svg?height=200&width=300",
    condition: "excellent",
  },
  {
    id: 4,
    name: "Camping Chair",
    price: 8,
    image: "/placeholder.svg?height=200&width=300",
    condition: "good",
  },
];

const conditionColors = {
  excellent: "bg-green-500",
  good: "bg-green-300",
  normal: "bg-yellow-400",
  bad: "bg-red-500",
};

export default function EquipmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const equipment = equipmentData[1]; // In a real app, use params.id to fetch data
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Booking form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");

  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  // Calculate rental days and total price
  const rentalDays =
    startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = rentalDays * equipment.price;
  const deliveryFee = deliveryOption === "delivery" ? 15 : 0;
  const finalTotal = totalPrice + deliveryFee;

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return equipment.unavailableDates.some(
      (unavailableDate) =>
        format(unavailableDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!startDate || (startDate && endDate) || isBefore(date, startDate)) {
      // Starting new selection
      setStartDate(date);
      setEndDate(undefined);
      setIsSelectingEndDate(true);
    } else if (startDate && !endDate && isAfter(date, startDate)) {
      // Selecting end date
      setEndDate(date);
      setIsSelectingEndDate(false);
    }
  };

  // Reset date selection
  const resetDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setIsSelectingEndDate(false);
  };

  // Handle booking submission
  const handleBooking = async () => {
    // In a real app, this would submit to an API
    console.log(
      "@@@",
      `Booking submitted for ${customerName}!\nDates: ${startDate ? format(startDate, "PPP") : ""} - ${endDate ? format(endDate, "PPP") : ""}\nTotal: $${finalTotal}`,
    );
    placeRentOrder({
      startDate: startDate?.toISOString() ?? "",
      endDate: endDate?.toISOString() ?? "",
      equipmentId: equipment.id,
      userId: 1,
    });
    setShowBookingForm(false);
    resetDates();
  };

  // Navigate images
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % equipment.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + equipment.images.length) % equipment.images.length,
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link
            href="/outdoorRent/equipments"
            className="mr-4 flex items-center gap-2 text-sm font-medium hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Equipment
          </Link>
          <h1 className="text-lg font-semibold">{equipment.name}</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={
                    equipment.images[selectedImageIndex] || "/placeholder.svg"
                  }
                  alt={equipment.name}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Badge
                  className={cn(
                    "absolute right-2 top-2",
                    conditionColors[
                      equipment.condition as keyof typeof conditionColors
                    ],
                  )}
                >
                  {equipment.condition.charAt(0).toUpperCase() +
                    equipment.condition.slice(1)}
                </Badge>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {equipment.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                      selectedImageIndex === index
                        ? "border-green-600"
                        : "border-transparent",
                    )}
                  >
                    <Image
                      src={"https://imgur.com/x347CHA.gif"}
                      alt={`${equipment.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Info and Booking */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">{equipment.name}</h1>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      ${equipment.price}
                    </p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{equipment.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({equipment.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{equipment.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{equipment.category}</Badge>
                  <Badge variant="outline">{equipment.type}</Badge>
                </div>

                <p className="text-muted-foreground">{equipment.description}</p>
              </div>

              {/* Availability Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Select Rental Dates
                  </CardTitle>
                  <CardDescription>
                    Choose your start and end dates. Unavailable dates are
                    marked in red.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        isBefore(date, new Date()) || isDateUnavailable(date)
                      }
                      modifiers={{
                        unavailable: equipment.unavailableDates,
                        selected_range:
                          startDate && endDate
                            ? Array.from(
                                {
                                  length:
                                    differenceInDays(endDate, startDate) + 1,
                                },
                                (_, i) => addDays(startDate, i),
                              )
                            : [],
                      }}
                      modifiersStyles={{
                        unavailable: {
                          backgroundColor: "#fee2e2",
                          color: "#dc2626",
                          textDecoration: "line-through",
                        },
                        selected_range: {
                          backgroundColor: "#dcfce7",
                          color: "#166534",
                        },
                      }}
                      className="rounded-md border"
                    />

                    {(startDate || endDate) && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                        <div className="text-sm">
                          {startDate && (
                            <p>
                              <strong>Start:</strong> {format(startDate, "PPP")}
                            </p>
                          )}
                          {endDate && (
                            <p>
                              <strong>End:</strong> {format(endDate, "PPP")}
                            </p>
                          )}
                          {rentalDays > 0 && (
                            <p>
                              <strong>Duration:</strong> {rentalDays}{" "}
                              {rentalDays === 1 ? "day" : "days"}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetDates}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Summary */}
              {rentalDays > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        ${equipment.price} × {rentalDays}{" "}
                        {rentalDays === 1 ? "day" : "days"}
                      </span>
                      <span>${totalPrice}</span>
                    </div>
                    {deliveryOption === "delivery" && (
                      <div className="flex justify-between">
                        <span>Delivery fee</span>
                        <span>${deliveryFee}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">${finalTotal}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={() => setShowBookingForm(true)}
                      disabled={!startDate || !endDate}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Damage Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Delivery Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-green-600" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({equipment.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Equipment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{equipment.longDescription}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {equipment.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(equipment.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b"
                          >
                            <span className="font-medium">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(equipment.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300",
                              )}
                            />
                          ))}
                      </div>
                      <span className="font-medium">
                        {equipment.rating} out of 5
                      </span>
                      <span className="text-muted-foreground">
                        ({equipment.reviewCount} reviews)
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                              />
                              <AvatarFallback>
                                {review.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          "h-3 w-3",
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300",
                                        )}
                                      />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(review.date), "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground ml-11">
                            {review.comment}
                          </p>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Equipment */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEquipment.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={"https://imgur.com/x347CHA.gif"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={cn(
                        "absolute right-2 top-2",
                        conditionColors[
                          item.condition as keyof typeof conditionColors
                        ],
                      )}
                    >
                      {item.condition.charAt(0).toUpperCase() +
                        item.condition.slice(1)}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="font-bold text-green-600">
                        ${item.price}/day
                      </p>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/equipment/${item.id}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Complete Your Booking</CardTitle>
              <CardDescription>
                {equipment.name} •{" "}
                {startDate &&
                  endDate &&
                  `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Option</Label>
                <Select
                  value={deliveryOption}
                  onValueChange={setDeliveryOption}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup (Free)</SelectItem>
                    <SelectItem value="delivery">Delivery (+$15)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests">Special Requests</Label>
                <Textarea
                  id="requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Equipment ({rentalDays} days)</span>
                  <span>${totalPrice}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>${deliveryFee}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${finalTotal}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowBookingForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!customerName || !customerEmail || !customerPhone}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm Booking
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
