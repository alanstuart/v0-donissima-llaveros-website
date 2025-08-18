"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Truck, Shield, Award, X, Plus, Minus } from "lucide-react"

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
      name: "Llama Andina",
      price: "S/ 25.00",
      image: "/placeholder-89ttz.png",
      rating: 5,
      reviews: 24,
      description: "Llavero artesanal de llama pintada a mano con colores tradicionales peruanos",
    },
    {
      id: 2,
      name: "Cóndor Majestuoso",
      price: "S/ 30.00",
      image: "/painted-condor-keychain.png",
      rating: 5,
      reviews: 18,
      description: "Símbolo sagrado de los Andes, pintado con técnicas ancestrales",
    },
    {
      id: 3,
      name: "Vicuña Dorada",
      price: "S/ 28.00",
      image: "/golden-vicuna-keychain.png",
      rating: 4,
      reviews: 31,
      description: "Elegante vicuña con detalles dorados, inspirada en la realeza inca",
    },
    {
      id: 4,
      name: "Jaguar Amazónico",
      price: "S/ 32.00",
      image: "/peruvian-jaguar-keychain.png",
      rating: 5,
      reviews: 15,
      description: "Poderoso jaguar de la selva peruana con patrones únicos",
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
      const price = Number.parseFloat(item.price.replace("S/ ", ""))
      return total + price * item.quantity
    }, 0)
  }

  const sendToWhatsApp = () => {
    const phoneNumber = "447471253426" // Número de WhatsApp actualizado
    let message = "¡Hola! Me interesan estos llaveros de Donissima Llaveros Peruanísimos:\n\n"

    cart.forEach((item) => {
      message += `🦙 ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio: ${item.price} c/u\n\n`
    })

    message += `💰 Total: S/ ${getTotalPrice().toFixed(2)}\n\n`
    message += "¿Podrían ayudarme con la compra? ¡Gracias!"

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
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="font-montserrat font-black text-xl text-primary">Donissima Llaveros</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#productos" className="text-sm font-medium hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#nosotros" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>

          <Button size="sm" className="bg-primary hover:bg-primary/90 relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Carrito
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
              <h2 className="font-montserrat font-bold text-lg">Tu Carrito</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground mt-8">Tu carrito está vacío</p>
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
                  <span className="font-montserrat font-bold text-lg text-primary">
                    S/ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={sendToWhatsApp}>
                  💬 Comprar por WhatsApp
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
            ✨ Artesanía 100% Peruana
          </Badge>
          <h1 className="font-montserrat font-black text-4xl md:text-6xl mb-6 text-foreground">
            Donissima Llaveros
            <span className="block text-primary">Peruanísimos</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra colección única de llaveros pintados a mano que celebran la rica fauna peruana con colores
            vibrantes y técnicas ancestrales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              Ver Colección
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Conoce Nuestra Historia
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Artesanía Auténtica</h3>
              <p className="text-muted-foreground">Cada llavero es pintado a mano por artesanos peruanos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Envío Nacional</h3>
              <p className="text-muted-foreground">Entregamos en todo el Perú de forma segura</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Calidad Garantizada</h3>
              <p className="text-muted-foreground">Materiales duraderos y acabados de primera</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4">Colección Destacada</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestros llaveros más populares, inspirados en la majestuosa fauna peruana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="font-montserrat font-bold text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>
                  <div className="flex items-center mb-3">
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
                    <span className="font-montserrat font-bold text-lg text-primary">{product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Ver Toda la Colección
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">
                🇵🇪 Hecho en Perú
              </Badge>
              <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-6">Nuestra Historia Peruanísima</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                En Donissima Llaveros Peruanísimos, cada pieza cuenta la historia de nuestro hermoso país. Nuestros
                artesanos, herederos de técnicas milenarias, plasman en cada llavero la esencia de la fauna peruana.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Desde las majestuosas llamas de los Andes hasta los jaguares de nuestra Amazonía, cada diseño celebra la
                biodiversidad que nos enorgullece como peruanos.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Conoce Más Sobre Nosotros
              </Button>
            </div>
            <div className="relative">
              <img
                src="/peruvian-keychain-workshop.png"
                alt="Artesano peruano pintando llaveros"
                className="rounded-lg shadow-xl w-full"
              />
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
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="font-montserrat font-black text-lg text-primary">Donissima Llaveros</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Artesanía peruana que lleva la magia de nuestros animales a todo el mundo.
              </p>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Productos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Animales Andinos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Fauna Amazónica
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Aves del Perú
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Colección Especial
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tallas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-montserrat font-bold mb-4">Síguenos</h4>
              <p className="text-sm text-muted-foreground mb-4">Mantente al día con nuestras nuevas colecciones</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">Facebook</span>📘
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">Instagram</span>📷
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <span className="sr-only">WhatsApp</span>💬
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Donissima Llaveros Peruanísimos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
