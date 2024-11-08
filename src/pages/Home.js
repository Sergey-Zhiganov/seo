import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products?_limit=10')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  const featuredProducts = products.slice(0, 10);

  return (
    <div>
      <section className="hero py-5">
        <div className="container">
          <div className="hero-content">
            <h1>Добро пожаловать в наш магазин электроники!</h1>
            <p className="lead">Мы предлагаем широкий ассортимент современной электроники и аксессуаров.</p>
            <p>У нас вы найдете все необходимое для повседневной жизни, от смартфонов до компьютерных компонентов.</p>
          </div>
        </div>
      </section>

      <section className="featured-products py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Новинки</h2>
          <div className="row">
            {featuredProducts.map(product => (
              <motion.div key={product.id} className="col-12 col-md-6 col-lg-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="services py-5">
        <div className="container">
          <h2 className="text-center mb-4">Наши услуги</h2>
          <ul className="list-unstyled">
            <li className="mb-2"><strong>Бесплатная доставка по всей стране.</strong></li>
            <li className="mb-2"><strong>Гарантия на все товары.</strong></li>
            <li className="mb-2"><strong>Профессиональные консультации по выбору товаров.</strong></li>
            <li className="mb-2"><strong>Специальные предложения и акции для постоянных клиентов.</strong></li>
          </ul>
        </div>
      </section>

      <section className="contact py-5">
        <div className="container">
          <h2 className="text-center mb-4">Связаться с нами</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default Home;
