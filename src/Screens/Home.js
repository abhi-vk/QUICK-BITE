import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';

export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 m-5" type="search" placeholder="Search" onChange={(e) => { setSearch(e.target.value) }} aria-label="Search" />
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/600x300/?Burger" className="d-block w-100" alt="Burger" style={{ filter: "brightness(50%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/600x300/?Pizza" className="d-block w-100" alt="Pizza" style={{ filter: "brightness(50%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/600x300/?Cake" className="d-block w-100" alt="Cake" style={{ filter: "brightness(50%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory.length > 0
          ? foodCategory.map((data) => {
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem
                  .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filteredItem) => {
                    return (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                      </div>
                    );
                  })}
              </div>
            );
          })
          : ""}
      </div>
      <div><Footer /></div>
    </div>
  );
}
