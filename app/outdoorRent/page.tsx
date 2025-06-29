import {
  ArrowRight,
  Bike,
  Calendar,
  CheckCircle,
  Compass,
  MapPin,
  Mountain,
  Ship,
  Star,
  Tent,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  // const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">OutdoorRent</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/outdoorRent"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/outdoorRent/equipments"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Equipment
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Book Now
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative h-[600px]">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Outdoor adventure"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Explore the Outdoors <br /> With Premium Gear
            </h1>
            <p className="mt-6 max-w-md text-lg">
              Rent high-quality outdoor equipment for your next adventure. No
              purchase necessary.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/outdoorRent/equipments">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse Equipment
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black border-white hover:bg-white/10"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Explore Our Categories
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We offer a wide range of outdoor equipment to make your adventure
              memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Tent className="w-12 h-12 mx-auto text-green-600" />
                <CardTitle>Camping</CardTitle>
                <CardDescription>
                  Tents, sleeping bags, and more
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Mountain className="w-12 h-12 mx-auto text-green-600" />
                <CardTitle>Hiking</CardTitle>
                <CardDescription>
                  Backpacks, boots, and trekking poles
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Bike className="w-12 h-12 mx-auto text-green-600" />
                <CardTitle>Cycling</CardTitle>
                <CardDescription>
                  Mountain bikes, helmets, and gear
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Ship className="w-12 h-12 mx-auto text-green-600" />
                <CardTitle>Water Sports</CardTitle>
                <CardDescription>
                  Kayaks, paddleboards, and life vests
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Featured Equipment */}
        <section className="bg-slate-50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Popular Equipment
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our most rented gear, perfect for your next adventure.
              </p>
            </div>

            <Tabs defaultValue="camping" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="camping">Camping</TabsTrigger>
                <TabsTrigger value="hiking">Hiking</TabsTrigger>
                <TabsTrigger value="cycling">Cycling</TabsTrigger>
                <TabsTrigger value="water">Water Sports</TabsTrigger>
              </TabsList>
              <TabsContent value="camping">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "4-Person Tent",
                      description: "Spacious waterproof tent with easy setup",
                      price: "$25/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Sleeping Bag",
                      description: "Comfortable for temperatures down to 30°F",
                      price: "$15/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Portable Stove",
                      description: "Compact and efficient cooking solution",
                      price: "$12/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{item.title}</CardTitle>
                          <Badge className="bg-green-600">{item.price}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Rent Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hiking">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Hiking Backpack",
                      description: "65L capacity with multiple compartments",
                      price: "$18/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Trekking Poles",
                      description: "Adjustable aluminum poles with cork grips",
                      price: "$10/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "GPS Navigator",
                      description: "Reliable navigation with preloaded trails",
                      price: "$20/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{item.title}</CardTitle>
                          <Badge className="bg-green-600">{item.price}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Rent Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="cycling">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Mountain Bike",
                      description: "Full suspension with hydraulic disc brakes",
                      price: "$35/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Cycling Helmet",
                      description: "Lightweight with adjustable fit system",
                      price: "$8/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Bike Repair Kit",
                      description: "Essential tools for on-trail repairs",
                      price: "$10/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{item.title}</CardTitle>
                          <Badge className="bg-green-600">{item.price}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Rent Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="water">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Kayak",
                      description: "Stable recreational kayak with paddle",
                      price: "$40/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Paddleboard",
                      description: "Inflatable SUP with pump and carry bag",
                      price: "$30/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Life Vest",
                      description:
                        "Coast guard approved PFD for water activities",
                      price: "$8/day",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{item.title}</CardTitle>
                          <Badge className="bg-green-600">{item.price}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Rent Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works */}
        <section className="container py-16" id="how-it-works">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Renting outdoor equipment has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Book Online</h3>
              <p className="text-muted-foreground">
                Browse our equipment and select your rental dates. Reserve with
                a small deposit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Pick Up or Delivery</h3>
              <p className="text-muted-foreground">
                Pick up your gear at our location or choose delivery for an
                additional fee.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Return When Done</h3>
              <p className="text-muted-foreground">
                Return the equipment in the same condition. No cleaning
                necessary.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Hear from adventurers who have used our rental services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  location: "Colorado",
                  quote:
                    "The camping equipment was top-notch and made our family trip so much easier. Will definitely rent again!",
                  rating: 5,
                },
                {
                  name: "Sarah Miller",
                  location: "Oregon",
                  quote:
                    "Rented a mountain bike for a weekend trip. The process was smooth and the bike was in perfect condition.",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  location: "Washington",
                  quote:
                    "Great kayak rental experience. The staff was helpful with recommendations for local spots to explore.",
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                    </div>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">{`"${testimonial.quote}"`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <Card className="bg-green-600 text-white">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Ready for Your Next Adventure?
                  </h2>
                  <p className="mb-6">
                    Book your outdoor equipment today and save 10% on your first
                    rental.
                  </p>
                  <Link href="/outdoorRent/equipments">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white hover:bg-white text-green-600 hover:text-green-700"
                    >
                      Browse Equipment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Outdoor adventure"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-slate-50">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">OutdoorRent</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Quality outdoor equipment rentals for all your adventures.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Equipment</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Camping
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Hiking
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Cycling
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Water Sports
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-green-600"
                  >
                    Winter Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-muted-foreground">
                <p>123 Adventure Way</p>
                <p>Mountain View, CA 94043</p>
                <p className="mt-2">info@OutdoorRent.com</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} OutdoorRent. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-green-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-green-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
