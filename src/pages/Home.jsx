import React from "react";
import EarthScene from "../components/EarthScene";
import Search from "../components/Search";
import Cards from "../components/Cards";
import "../styles/Home.css";

function Home() {
  return (
    <div className="hero">
      <EarthScene />

      <div className="layout">
        <div className="search-section">
          <Search />
        </div>
        <Cards />
      </div>

      <div className="title">
        <div className="loader">
          <p>Get</p>
          <div className="words">
            <span className="word">Instant</span>
            <span className="word">Accurate</span>
            <span className="word">Reliable</span>
            <span className="word">Up to date</span>
            <span className="word">Detailed</span>
          </div>
          <p>&nbsp;Weather updates</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
