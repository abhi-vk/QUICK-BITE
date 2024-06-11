import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Good food is the foundation of genuine happiness.",
    "Cooking is love made visible.",
    "Eat well, live well, be well.",
    "Life is uncertain. Eat dessert first.",
    "Food is symbolic of love when words are inadequate.",
    "Food is our common ground, a universal experience.",
    "One cannot think well, love well, sleep well, if one has not dined well.",
    "Food tastes better when you eat it with your family.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" style={{ fontWeight: "bold", color: "#FFD700" }} to="/">
            <FontAwesomeIcon icon={faUtensils} className="me-2" style={{ fontSize: "1.5rem", color: "#FFD700" }} />
            QuickBite
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fs-5" style={{ color: "white", fontWeight: "bold" }} to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <Link className="nav-link fs-5" style={{ color: "white", fontWeight: "bold" }} to="/myOrder">History</Link>
                </li>
              }
            </ul>
            <div className="navbar-text fs-5 text-center flex-grow-1" style={{ color: "#FFD700", animation: "fadeRight 8s infinite" }}>{quotes[quoteIndex]}</div>
            <ul className="navbar-nav">
              {!localStorage.getItem("authToken") ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/Createuser">Signup</Link>
                </div>
                :
                <>
                  <div className="btn bg-white text-warning mx-1 fw-bold" onClick={() => setCartView(true)}>
                    <>Cart🛒 {" "}</>
                    <>
                      {data.length !== 0 ? <Badge pill bg="danger">{data.length}</Badge> : null}
                    </>
                  </div>
                  <li className="nav-item">
                    <div className="btn bg-white text-danger fw-bold mx-1" onClick={handleLogout}>Logout</div>
                  </li>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
