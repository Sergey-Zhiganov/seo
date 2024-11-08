import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Избранное</h1>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map(product => (
            <motion.div key={product.id} className="col-md-4 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col text-center">
            <p>У вас нет избранных товаров.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
