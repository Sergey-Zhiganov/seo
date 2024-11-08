import React from 'react';
import ProductDetail from '../components/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <ProductDetail />
        </div>
      </div>
    </div>
  );
}

export default Product;
