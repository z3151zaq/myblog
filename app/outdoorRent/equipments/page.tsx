"use client";

import { format } from "date-fns";
import { CalendarIcon, Filter, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Sample data for equipment
const equipmentData = [
  {
    id: 1,
    name: "4-Person Tent",
    category: "Camping",
    type: "Tents",
    price: 25,
    location: "Denver, CO",
    condition: "excellent",
    image: "/placeholder.svg?height=200&width=300",
    description: "Spacious waterproof tent with easy setup",
  },
  {
    id: 2,
    name: "Sleeping Bag",
    category: "Camping",
    type: "Sleeping Gear",
    price: 15,
    location: "Boulder, CO",
    condition: "good",
    image: "/placeholder.svg?height=200&width=300",
    description: "Comfortable for temperatures down to 30°F",
  },
  {
    id: 3,
    name: "Portable Stove",
    category: "Camping",
    type: "Cooking",
    price: 12,
    location: "Denver, CO",
    condition: "normal",
    image: "/placeholder.svg?height=200&width=300",
    description: "Compact and efficient cooking solution",
  },
  {
    id: 4,
    name: "Hiking Backpack",
    category: "Hiking",
    type: "Bags",
    price: 18,
    location: "Fort Collins, CO",
    condition: "excellent",
    image: "/placeholder.svg?height=200&width=300",
    description: "65L capacity with multiple compartments",
  },
  {
    id: 5,
    name: "Trekking Poles",
    category: "Hiking",
    type: "Accessories",
    price: 10,
    location: "Boulder, CO",
    condition: "good",
    image: "/placeholder.svg?height=200&width=300",
    description: "Adjustable aluminum poles with cork grips",
  },
  {
    id: 6,
    name: "GPS Navigator",
    category: "Hiking",
    type: "Electronics",
    price: 20,
    location: "Denver, CO",
    condition: "normal",
    image: "/placeholder.svg?height=200&width=300",
    description: "Reliable navigation with preloaded trails",
  },
  {
    id: 7,
    name: "Mountain Bike",
    category: "Cycling",
    type: "Bikes",
    price: 35,
    location: "Boulder, CO",
    condition: "excellent",
    image: "/placeholder.svg?height=200&width=300",
    description: "Full suspension with hydraulic disc brakes",
  },
  {
    id: 8,
    name: "Cycling Helmet",
    category: "Cycling",
    type: "Safety",
    price: 8,
    location: "Denver, CO",
    condition: "good",
    image: "/placeholder.svg?height=200&width=300",
    description: "Lightweight with adjustable fit system",
  },
  {
    id: 9,
    name: "Bike Repair Kit",
    category: "Cycling",
    type: "Tools",
    price: 10,
    location: "Fort Collins, CO",
    condition: "normal",
    image: "/placeholder.svg?height=200&width=300",
    description: "Essential tools for on-trail repairs",
  },
  {
    id: 10,
    name: "Kayak",
    category: "Water Sports",
    type: "Boats",
    price: 40,
    location: "Boulder, CO",
    condition: "excellent",
    image: "/placeholder.svg?height=200&width=300",
    description: "Stable recreational kayak with paddle",
  },
  {
    id: 11,
    name: "Paddleboard",
    category: "Water Sports",
    type: "Boards",
    price: 30,
    location: "Denver, CO",
    condition: "good",
    image: "/placeholder.svg?height=200&width=300",
    description: "Inflatable SUP with pump and carry bag",
  },
  {
    id: 12,
    name: "Life Vest",
    category: "Water Sports",
    type: "Safety",
    price: 8,
    location: "Fort Collins, CO",
    condition: "bad",
    image: "/placeholder.svg?height=200&width=300",
    description: "Coast guard approved PFD for water activities",
  },
];

// Sample data for categories and types
const categories = [
  { value: "Camping", label: "Camping" },
  { value: "Hiking", label: "Hiking" },
  { value: "Cycling", label: "Cycling" },
  { value: "Water Sports", label: "Water Sports" },
];

const types = {
  Camping: ["Tents", "Sleeping Gear", "Cooking", "Lighting"],
  Hiking: ["Bags", "Footwear", "Accessories", "Electronics"],
  Cycling: ["Bikes", "Safety", "Tools", "Accessories"],
  "Water Sports": ["Boats", "Boards", "Safety", "Accessories"],
};

// Sample data for locations
const locations = [
  { value: "Denver, CO", label: "Denver, CO" },
  { value: "Boulder, CO", label: "Boulder, CO" },
  { value: "Fort Collins, CO", label: "Fort Collins, CO" },
];

// Condition options
const conditionOptions = [
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "normal", label: "Normal" },
  { id: "bad", label: "Bad" },
];

// Condition badge colors
const conditionColors = {
  excellent: "bg-green-500",
  good: "bg-green-300",
  normal: "bg-yellow-400",
  bad: "bg-red-500",
};

export default function EquipmentPage() {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [date, setDate] = useState<Date>();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get available types based on selected category
  const availableTypes = selectedCategory
    ? types[selectedCategory as keyof typeof types]
    : [];

  // Filter equipment based on selected filters
  const filteredEquipment = equipmentData.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (selectedCategory === "all") {
      return true;
    } else if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }

    // Filter by type
    if (selectedType === "all") {
      return true;
    } else if (selectedType && item.type !== selectedType) {
      return false;
    }

    // Filter by price range
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }

    // Filter by location
    if (selectedLocation && item.location !== selectedLocation) {
      return false;
    }

    // Filter by condition
    if (
      selectedConditions.length > 0 &&
      !selectedConditions.includes(item.condition)
    ) {
      return false;
    }

    return true;
  });

  // Toggle condition selection
  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setPriceRange([0, 50]);
    setDate(undefined);
    setSelectedLocation("");
    setSelectedConditions([]);
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/outdoorRent" className="mr-6 flex items-center gap-2">
            <span className="text-xl font-bold">OutdoorRent</span>
          </Link>
          <h1 className="text-lg font-semibold">Equipment List</h1>
        </div>
      </header>

      <div className="container py-6 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Input
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {filteredEquipment.length}{" "}
              {filteredEquipment.length === 1 ? "item" : "items"} found
            </p>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down equipment based on your preferences.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-6">
                    {/* Mobile Category Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="mobile-category">Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger id="mobile-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" key="all">
                            All Categories
                          </SelectItem>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile Type Filter */}
                    {selectedCategory && (
                      <div className="space-y-2">
                        <Label htmlFor="mobile-type">Type</Label>
                        <Select
                          value={selectedType}
                          onValueChange={setSelectedType}
                        >
                          <SelectTrigger id="mobile-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {availableTypes?.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Mobile Price Range Filter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Price Range (per day)</Label>
                        <span className="text-sm">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 50]}
                        max={50}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="py-4"
                      />
                    </div>

                    {/* Mobile Date Filter */}
                    <div className="space-y-2">
                      <Label>Available Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Mobile Location Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="mobile-location">Location</Label>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger id="mobile-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {locations.map((location) => (
                            <SelectItem
                              key={location.value}
                              value={location.value}
                            >
                              {location.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile Condition Filter */}
                    <div className="space-y-3">
                      <Label>Condition</Label>
                      <div className="space-y-2">
                        {conditionOptions.map((condition) => (
                          <div
                            key={condition.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`mobile-condition-${condition.id}`}
                              checked={selectedConditions.includes(
                                condition.id,
                              )}
                              onCheckedChange={() =>
                                toggleCondition(condition.id)
                              }
                            />
                            <Label
                              htmlFor={`mobile-condition-${condition.id}`}
                              className="font-normal"
                            >
                              {condition.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Desktop Filters Sidebar */}
          <div className="hidden space-y-6 md:block">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Filters</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="mb-4"
              >
                Reset All Filters
              </Button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="font-medium">Category</h4>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" key="all">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            {selectedCategory && (
              <div className="space-y-2">
                <h4 className="font-medium">Type</h4>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {availableTypes?.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Separator />

            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Price Range (per day)</h4>
                <span className="text-sm">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 50]}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>

            <Separator />

            {/* Date Filter */}
            <div className="space-y-2">
              <h4 className="font-medium">Available Date</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDate(undefined)}
                  className="mt-1 h-auto p-0 text-sm text-muted-foreground"
                >
                  Clear date
                </Button>
              )}
            </div>

            <Separator />

            {/* Location Filter */}
            <div className="space-y-2">
              <h4 className="font-medium">Location</h4>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Condition Filter */}
            <div className="space-y-3">
              <h4 className="font-medium">Condition</h4>
              <div className="space-y-2">
                {conditionOptions.map((condition) => (
                  <div
                    key={condition.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`condition-${condition.id}`}
                      checked={selectedConditions.includes(condition.id)}
                      onCheckedChange={() => toggleCondition(condition.id)}
                    />
                    <Label
                      htmlFor={`condition-${condition.id}`}
                      className="font-normal"
                    >
                      {condition.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Grid */}
          <div>
            {filteredEquipment.length === 0 ? (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="mt-4 text-lg font-semibold">
                  No equipment found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{`Try adjusting your filters or search query to find what you're looking for.`}</p>
                <Button onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEquipment.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
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
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="font-bold text-green-600">
                          ${item.price}/day
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {item.location}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Rent Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
