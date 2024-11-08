import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductList = ({ products }) => {
  return (
    <div className="row">
      {products.map(product => (
        <motion.div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}

export default ProductList;
