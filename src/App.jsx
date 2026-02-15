import { useState } from 'react'
import './App.css'
import { db } from './db/db'
import Header from './Componentes/Header'
import Menu from './Componentes/Menu'
import Order from './Componentes/Order'

function App() {
  const [order, setOrder] = useState([])
  const [tip, setTip] = useState(0)

  const addToOrder = (item) => {
    const existingItem = order.find(orderItem => orderItem.id === item.id)
    
    if (existingItem) {
      setOrder(order.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ))
    } else {
      setOrder([...order, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (id) => {
    setOrder(order.filter(item => item.id !== id))
  }

  const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tipAmount = (subtotal * tip) / 100
  const total = subtotal + tipAmount

  return (
    <>
      <Header />
      <div className="container">
        <Menu db={db} addToOrder={addToOrder} />
        <Order 
          order={order}
          tip={tip}
          setTip={setTip}
          removeFromOrder={removeFromOrder}
          subtotal={subtotal}
          tipAmount={tipAmount}
          total={total}
          setOrder={setOrder}
        />
      </div>
    </>
  )
}

export default App