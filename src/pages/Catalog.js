import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!category || product.category === category);
  });

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Каталог</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Поиск..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
        <div className="col-md-6">
          <select 
            className="form-control" 
            value={category} 
            onChange={handleCategoryChange}
          >
            <option value="">Все категории</option>
            <option value="Ноутбуки">Ноутбуки</option>
            <option value="Планшеты">Планшеты</option>
            <option value="Наушники">Наушники</option>
            <option value="Смарт-часы">Смарт-часы</option>
            <option value="Фотоаппараты">Фотоаппараты</option>
            <option value="Мониторы">Мониторы</option>
            <option value="Принтеры">Принтеры</option>
            <option value="Сетевое оборудование">Сетевое оборудование</option>
            <option value="Аксессуары для компьютеров">Аксессуары для компьютеров</option>
            <option value="Хранение данных">Хранение данных</option>
            <option value="Комплектующие">Комплектующие</option>
            <option value="VR-устройства">VR-устройства</option>
            <option value="Аксессуары для дома">Аксессуары для дома</option>

          </select>
        </div>
      </div>
      <div className="row">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}

export default Catalog;
