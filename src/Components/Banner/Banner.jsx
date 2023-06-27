import React, { useState } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';
import ArrowDown from '../../assets/ArrowDown'
import { Dropdown } from 'react-bootstrap';

function Banner() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
            <Dropdown.Toggle
              variant=""
              id="categoryDropdown"
              className="custom-toggle"
            >
              <span className="me-3">ALL CATEGORIES</span>
              {showDropdown ? <ArrowDown /> : <Arrow />}
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-menu">
              <Dropdown.Item>All Categories</Dropdown.Item>
              <Dropdown.Item>Cars</Dropdown.Item>
              <Dropdown.Item>Motorcycles</Dropdown.Item>
              <Dropdown.Item>Mobile Phones</Dropdown.Item>
              <Dropdown.Item>Houses & Apartments</Dropdown.Item>
              <Dropdown.Item>Scooters</Dropdown.Item>
              <Dropdown.Item>Commercial Vehicles</Dropdown.Item>
              <Dropdown.Item>For Rent: House & Apartments</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcycles</span>
            <span>Mobile Phones</span>
            <span>Houses & Apartments</span>
            <span>Scooters</span>
            <span>Commercial Vehicles</span>
            <span>For Rent: House & Apartments</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
