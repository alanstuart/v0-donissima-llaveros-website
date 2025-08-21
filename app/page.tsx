"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Truck, X, Plus, Minus, Upload, Palette } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: "Custom Pet Keychain",
      price: "£30.00",
      image: "/cute-painted-pet-keychain.png",
      rating: 5,
      reviews: 47,
      description: "Hand-painted keychain of your beloved pet, protected with resin coating",
    },
    {
      id: 2,
      name: "Pet Portrait Painting",
      price: "£50.00",
      image: "/hand-painted-pet-portrait.png",
      rating: 5,
      reviews: 32,
      description: "A5 size hand-painted portrait of your pet, perfect for framing",
    },
    {
      id: 3,
      name: "Christmas Pet Ornament",
      price: "£30.00",
      image: "/painted-pet-ornament.png",
      rating: 5,
      reviews: 28,
      description: "Festive Christmas ornament featuring your pet, hand-painted with holiday details",
    },
  ]

  const addToCart = (product: (typeof featuredProducts)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ]
      }
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("£", ""))
      return total + price * item.quantity
    }, 0)
  }

  const sendToWhatsApp = () => {
    const phoneNumber = "447471253426"
    let message = "Hello! I'm interested in these personalized pet products from ArtiLu:\n\n"

    cart.forEach((item) => {
      message += `🎨 ${item.name}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: ${item.price} each\n\n`
    })

    message += `💰 Total: £${getTotalPrice().toFixed(2)}\n\n`
    message += "Could you help me with the purchase? I'll send photos of my pet separately. Thank you!"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Palette className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="font-montserrat font-black text-xl text-primary">ArtiLu</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <Button size="sm" className="bg-primary hover:bg-primary/90 relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsCartOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-montserrat font-bold text-lg">Your Cart</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground mt-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-muted/30 p-3 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-primary font-bold text-sm">{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat font-bold">Total:</span>
                  <span className="font-montserrat font-bold text-lg text-primary">£{getTotalPrice().toFixed(2)}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={sendToWhatsApp}>
                  💬 Order via WhatsApp
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">
            🎨 Hand-painted in London
          </Badge>
          <h1 className="font-montserrat font-black text-4xl md:text-6xl mb-6 text-foreground">
            Personalized Pet Products
            <span className="block text-primary">Painted with Love</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Custom keychains, paintings, and Christmas ornaments of your beloved pets, hand-painted and protected with
            resin for lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              See Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your personalized pet artwork
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">1. Upload Photos</h3>
              <p className="text-muted-foreground">Send photos of your pet in PNG format via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">2. Personal Consultation</h3>
              <p className="text-muted-foreground">I'll help you choose the best photo and discuss design details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">3. Hand-painted Creation</h3>
              <p className="text-muted-foreground">Your piece is painted by hand and protected with resin coating</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">4. Safe Delivery</h3>
              <p className="text-muted-foreground">Free shipping across the UK during our launch month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4">Our Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your product, upload your pet's photos, and let me create something unique for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-montserrat font-bold text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-4 line-clamp-2">{product.description}</CardDescription>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? "text-secondary fill-secondary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-bold text-xl text-primary">{product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">
                🇬🇧 Made in London
              </Badge>
              <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-6">About ArtiLu</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm the person behind ArtiLu. I started in Peru painting personalized pet memories and now in London, I
                continue bringing that passion to every commission, with dedication, care, and hand-painted artistry.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My goal is to immortalize your pet in a unique piece that preserves their essence forever. Each artwork
                is protected with resin coating to ensure it lasts as long as your memories.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn More About My Story
              </Button>
            </div>
            <div className="relative">
              <img
                src="/peruvian-keychain-workshop.png"
                alt="Artist painting pet portraits in London studio"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">How long does my order take?</h3>
                <p className="text-muted-foreground">Between 1-2 weeks from design confirmation.</p>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">Can I include multiple pets?</h3>
                <p className="text-muted-foreground">
                  Yes! Let me know when placing your order and we'll coordinate the details.
                </p>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">What are the product sizes?</h3>
                <p className="text-muted-foreground">
                  Keychains: approx. 5-6cm, Paintings: A5 size, Ornaments: approx. 6-7cm diameter
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">How do I care for my piece?</h3>
                <p className="text-muted-foreground">Avoid direct sunlight and clean gently with a dry cloth.</p>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">Do you ship internationally?</h3>
                <p className="text-muted-foreground">
                  Currently offering free shipping across the UK during our launch month.
                </p>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  Stripe, PayPal, and credit cards. All prices in British pounds (£).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Palette className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="font-montserrat font-black text-lg text-primary">ArtiLu</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Personalized pet products painted with love in London, preserving your pet's memory forever.
              </p>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Custom Keychains
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pet Portraits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Christmas Ornaments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Custom Requests
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Care Instructions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground mb-4">Stay updated with new collections and special offers</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">Instagram</span>📷
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">WhatsApp</span>💬
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">Email</span>✉️
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ArtiLu. All rights reserved. Hand-painted with love in London.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
