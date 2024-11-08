import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  return (
    <motion.div className="card h-400 shadow-sm"
      whileHover={{ scale: 1.05 }}>
      <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text"><strong>{product.price.toLocaleString()} руб.</strong></p>
      </div>
      <div className="card-footer bg-transparent border-0">
        <Link to={`/product/${product.id}`} className="btn btn-primary stretched-link">
          Подробнее
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
