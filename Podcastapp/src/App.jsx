import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import './App.css'

// Import your components for each route
import Home from './components/Home';
import Shows from './components/Shows';
import Genres from './components/Genres';
import Favorites from './components/Favorites';
import Layout from './components/Layout/Layout';
import ShowDetail from './components/ShowDetail';
import GenreDetail from './components/GenreDetail';

function App() {


  return (

      <BrowserRouter>
      <Layout />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/ShowDetail/:id" element={<ShowDetail />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genreid" element={<GenreDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
