import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  const addToCart = (product) => {
    axios.patch(`http://localhost:3001/cart/${product.id}`, { quantity: product.quantity + 1 })
      .then(() => setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
      .catch(error => console.error('Ошибка при добавлении в корзину:', error));
  };

  const removeFromCart = (product) => {
    if (product.quantity > 1) {
      axios.patch(`http://localhost:3001/cart/${product.id}`, { quantity: product.quantity - 1 })
        .then(() => setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)))
        .catch(error => console.error('Ошибка при удалении из корзины:', error));
    } else {
      axios.delete(`http://localhost:3001/cart/${product.id}`)
        .then(() => setCart(cart.filter(cartItem => cartItem.id !== product.id)))
        .catch(error => console.error('Ошибка при удалении из корзины:', error));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('ru-RU');
  };

  return (
    <motion.div className="cart container py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="mb-4">Корзина</h2>
      <ul className="list-group mb-4">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span>{item.name}</span> - <span>{item.price.toLocaleString('ru-RU')} руб.</span> (Количество: {item.quantity})
              <br />
              <Link to={`/product/${item.id}`} className="btn btn-outline-primary btn-sm mt-2">Подробнее</Link>
            </div>
            <div>
              <button className="btn btn-sm btn-primary mx-2" onClick={() => addToCart(item)}>Добавить еще</button>
              <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Итоговая стоимость: {getTotalPrice()} руб.</h3>
    </motion.div>
  );
}

export default Cart;
