import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));

    axios.get('http://localhost:3001/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));

    axios.get('http://localhost:3001/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, [id]);

  if (!product) return <div className="container py-4">Загрузка...</div>;

  const isFavorite = favorites.some(fav => fav.id === product.id);
  const cartItem = cart.find(cartItem => cartItem.id === product.id);
  const isInCart = !!cartItem;

  const addToFavorites = () => {
    axios.post('http://localhost:3001/favorites', product)
      .then(() => setFavorites([...favorites, product]))
      .catch(error => console.error('Ошибка при добавлении в избранное:', error));
  };

  const removeFromFavorites = () => {
    axios.delete(`http://localhost:3001/favorites/${product.id}`)
      .then(() => setFavorites(favorites.filter(fav => fav.id !== product.id)))
      .catch(error => console.error('Ошибка при удалении из избранного:', error));
  };

  const addToCart = () => {
    if (isInCart) {
      axios.patch(`http://localhost:3001/cart/${product.id}`, { quantity: cartItem.quantity + 1 })
        .then(() => setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
        .catch(error => console.error('Ошибка при добавлении в корзину:', error));
    } else {
      axios.post('http://localhost:3001/cart', { ...product, quantity: 1 })
        .then(() => setCart([...cart, { ...product, quantity: 1 }]))
        .catch(error => console.error('Ошибка при добавлении в корзину:', error));
    }
  };

  const removeFromCart = () => {
    if (cartItem.quantity > 1) {
      axios.patch(`http://localhost:3001/cart/${product.id}`, { quantity: cartItem.quantity - 1 })
        .then(() => setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)))
        .catch(error => console.error('Ошибка при удалении из корзины:', error));
    } else {
      axios.delete(`http://localhost:3001/cart/${product.id}`)
        .then(() => setCart(cart.filter(cartItem => cartItem.id !== product.id)))
        .catch(error => console.error('Ошибка при удалении из корзины:', error));
    }
  };

  return (
    <motion.div className="product-detail container py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="row">
        <div className="col-md-6">
          <div className="product-image">
            <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="img-fluid" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Цена: {product.price} руб.</p>
            <div className="product-details">
              <h3>Характеристики:</h3>
              <ul className="list-group">
                {Object.entries(product.details).map(([key, value]) => (
                  <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{translateKey(key)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
            {isFavorite ? (
              <button className="btn btn-outline-danger btn-sm mt-3" onClick={removeFromFavorites}>Удалить из избранного</button>
            ) : (
              <button className="btn btn-outline-primary btn-sm mt-3" onClick={addToFavorites}>Добавить в избранное</button>
            )}
            {isInCart ? (
              <div className="mt-3">
                <button className="btn btn-outline-primary btn-sm mr-2" onClick={addToCart}>Добавить еще</button>
                <button className="btn btn-outline-danger btn-sm" onClick={removeFromCart}>Удалить</button>
                <p>Количество в корзине: {cartItem.quantity}</p>
              </div>
            ) : (
              <button className="btn btn-outline-primary btn-sm mt-3" onClick={addToCart}>Добавить в корзину</button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function translateKey(key) {
  const translations = {
    processor: 'Процессор',
    display: 'Дисплей',
    connection: 'Соединение',
    features: 'Особенности',
    sensor: 'Сенсор',
    video: 'Видео',
    autofocus: 'Автофокус',
    resolution: 'Разрешение',
    print_technology: 'Технология печати',
    print_speed: 'Скорость печати',
    wifi_standard: 'Стандарт Wi-Fi',
    speed: 'Скорость',
    switches: 'Переключатели',
    interface: 'Интерфейс',
    capacity: 'Емкость',
    modes: 'Режимы',
    gpu: 'Графический процессор',
    memory: 'Память'
  };
  return translations[key] || key;
}

export default ProductDetail;