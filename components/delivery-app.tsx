"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, ShoppingBag, Search, Filter } from "lucide-react"

interface DeliveryAppProps {
  onEvaluation: (approved: boolean) => void
}

export default function DeliveryApp({ onEvaluation }: DeliveryAppProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [testProgress, setTestProgress] = useState(0)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)

  const screens = ["home", "restaurant", "cart", "checkout"]

  useEffect(() => {
    const timer = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const restaurants = [
    { name: "Burger King", rating: 4.5, time: "25-35 min", category: "Lanches", image: "🍔" },
    { name: "Pizza Hut", rating: 4.7, time: "30-40 min", category: "Pizza", image: "🍕" },
    { name: "McDonald's", rating: 4.3, time: "20-30 min", category: "Lanches", image: "🍟" },
    { name: "Subway", rating: 4.6, time: "15-25 min", category: "Sanduíches", image: "🥪" },
  ]

  const menuItems = {
    "Burger King": [
      { name: "Big King", price: 18.9, description: "Hambúrguer duplo com queijo", image: "🍔" },
      { name: "Whopper", price: 22.5, description: "O clássico da casa", image: "🍔" },
      { name: "Batata Frita", price: 8.9, description: "Porção média crocante", image: "🍟" },
      { name: "Refrigerante", price: 6.5, description: "Coca-Cola 350ml", image: "🥤" },
    ],
    "Pizza Hut": [
      { name: "Pizza Pepperoni", price: 39.9, description: "Pepperoni e queijo", image: "🍕" },
      { name: "Pizza Margherita", price: 35.5, description: "Molho, queijo e manjericão", image: "🍕" },
      { name: "Pizza Suprema", price: 45.9, description: "Carnes e vegetais", image: "🍕" },
      { name: "Refrigerante 2L", price: 12.5, description: "Coca-Cola, Pepsi ou Guaraná", image: "🥤" },
      { name: "Breadsticks", price: 15.9, description: "Palitos de pão com molho", image: "🥖" },
    ],
    "McDonald's": [
      { name: "Big Mac", price: 20.9, description: "O sanduíche mais famoso", image: "🍔" },
      { name: "McChicken", price: 18.5, description: "Frango empanado", image: "🍔" },
      { name: "Batata Frita", price: 9.9, description: "Porção média", image: "🍟" },
      { name: "Sundae", price: 8.5, description: "Sorvete com calda", image: "🍦" },
    ],
    Subway: [
      { name: "Sub 15cm Frango", price: 19.9, description: "Frango desfiado", image: "🥪" },
      { name: "Sub 15cm Carne", price: 21.5, description: "Carne bovina", image: "🥪" },
      { name: "Cookie", price: 5.9, description: "Chocolate ou baunilha", image: "🍪" },
      { name: "Refrigerante", price: 6.5, description: "Lata 350ml", image: "🥤" },
    ],
  }

  const handleRestaurantClick = (restaurantName: string) => {
    setSelectedRestaurant(restaurantName)
    nextScreen()
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2">FoodExpress - App de Delivery</h3>
        <p className="text-sm text-slate-600">Navegue pelo app e teste suas funcionalidades</p>
        <div className="mt-2">
          <div className="bg-slate-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${testProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Testando funcionalidades... {Math.floor(testProgress)}%</p>
        </div>
      </div>

      {/* App Interface */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
        {/* App Header */}
        <div className="bg-red-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6" />
              <span className="font-bold text-lg">FoodExpress</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Vila Madalena, São Paulo</span>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-80 overflow-y-auto">
          {/* Home Screen */}
          {currentScreen === 0 && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-3">
                <Search className="w-5 h-5 text-slate-400" />
                <span className="text-slate-500">Buscar restaurantes...</span>
                <Filter className="w-5 h-5 text-slate-400 ml-auto" />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">Restaurantes próximos</h4>
                {restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100"
                    onClick={() => handleRestaurantClick(restaurant.name)}
                  >
                    <div className="text-3xl">{restaurant.image}</div>
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-900">{restaurant.name}</h5>
                      <p className="text-xs text-slate-600">{restaurant.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-600">{restaurant.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant Screen */}
          {currentScreen === 1 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
                <h4 className="font-bold text-lg">{selectedRestaurant || "Restaurante"}</h4>
                <p className="text-sm opacity-90">
                  {selectedRestaurant === "Burger King" || selectedRestaurant === "McDonald's"
                    ? "Lanches"
                    : selectedRestaurant === "Pizza Hut"
                      ? "Pizza"
                      : "Sanduíches"}{" "}
                  •
                  {selectedRestaurant === "Burger King"
                    ? "25-35 min"
                    : selectedRestaurant === "Pizza Hut"
                      ? "30-40 min"
                      : selectedRestaurant === "McDonald's"
                        ? "20-30 min"
                        : "15-25 min"}{" "}
                  • Taxa R$ 3,99
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">
                    {selectedRestaurant === "Burger King"
                      ? "4.5"
                      : selectedRestaurant === "Pizza Hut"
                        ? "4.7"
                        : selectedRestaurant === "McDonald's"
                          ? "4.3"
                          : "4.6"}{" "}
                    (1.2k avaliações)
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h5 className="font-semibold text-slate-900">Menu</h5>
                {selectedRestaurant &&
                  menuItems[selectedRestaurant as keyof typeof menuItems].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                      onClick={nextScreen}
                    >
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <h6 className="font-medium text-slate-900">{item.name}</h6>
                        <p className="text-xs text-slate-600">{item.description}</p>
                        <p className="text-sm font-semibold text-emerald-600 mt-1">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        +
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Cart Screen */}
          {currentScreen === 2 && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-slate-900">Seu Pedido</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {selectedRestaurant === "Pizza Hut" ? "🍕" : selectedRestaurant === "Subway" ? "🥪" : "🍔"}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">
                        {selectedRestaurant === "Pizza Hut"
                          ? "Pizza Pepperoni"
                          : selectedRestaurant === "Subway"
                            ? "Sub 15cm Frango"
                            : selectedRestaurant === "McDonald's"
                              ? "Big Mac"
                              : "Big King"}
                      </p>
                      <p className="text-xs text-slate-600">Quantidade: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-900">
                    R${" "}
                    {selectedRestaurant === "Pizza Hut"
                      ? "39,90"
                      : selectedRestaurant === "Subway"
                        ? "19,90"
                        : selectedRestaurant === "McDonald's"
                          ? "20,90"
                          : "18,90"}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {selectedRestaurant === "Pizza Hut" ? "🥤" : selectedRestaurant === "Subway" ? "🍪" : "🍟"}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">
                        {selectedRestaurant === "Pizza Hut"
                          ? "Refrigerante 2L"
                          : selectedRestaurant === "Subway"
                            ? "Cookie"
                            : "Batata Frita"}
                      </p>
                      <p className="text-xs text-slate-600">Quantidade: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-900">
                    R${" "}
                    {selectedRestaurant === "Pizza Hut"
                      ? "12,50"
                      : selectedRestaurant === "Subway"
                        ? "5,90"
                        : selectedRestaurant === "McDonald's"
                          ? "9,90"
                          : "8,90"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    R${" "}
                    {selectedRestaurant === "Pizza Hut"
                      ? "52,40"
                      : selectedRestaurant === "Subway"
                        ? "25,80"
                        : selectedRestaurant === "McDonald's"
                          ? "30,80"
                          : "27,80"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega</span>
                  <span>R$ 3,99</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    R${" "}
                    {selectedRestaurant === "Pizza Hut"
                      ? "56,39"
                      : selectedRestaurant === "Subway"
                        ? "29,79"
                        : selectedRestaurant === "McDonald's"
                          ? "34,79"
                          : "31,79"}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-red-500 hover:bg-red-600 h-12" onClick={nextScreen}>
                Finalizar Pedido
              </Button>
            </div>
          )}

          {/* Checkout Screen */}
          {currentScreen === 3 && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-slate-900">Finalizar Pedido</h4>

              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Endereço de Entrega</h5>
                  <p className="text-sm text-slate-600">Rua Augusta, 456 - Vila Madalena</p>
                  <p className="text-sm text-slate-600">São Paulo, SP</p>
                </div>

                <div className="p-3 border border-slate-200 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Forma de Pagamento</h5>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <span className="text-sm">**** 1234</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-800">✅ Pedido confirmado!</p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Tempo estimado:{" "}
                    {selectedRestaurant === "Burger King"
                      ? "25-35"
                      : selectedRestaurant === "Pizza Hut"
                        ? "30-40"
                        : selectedRestaurant === "McDonald's"
                          ? "20-30"
                          : "15-25"}{" "}
                    minutos
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 p-3 bg-slate-50">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index <= currentScreen ? "bg-red-500" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Evaluation */}
      {testProgress >= 100 && (
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 mb-3">Avalie este aplicativo:</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => onEvaluation(true)} className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white">
              ✅ Aprovar
            </Button>
            <Button onClick={() => onEvaluation(false)} className="h-12 bg-red-500 hover:bg-red-600 text-white">
              ❌ Reprovar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
