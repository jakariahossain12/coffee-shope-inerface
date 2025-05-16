import React, { useState } from "react";
import bg_color from "../../images/more/bg-color10.png";
import bg_right from "../../images/more/bg-logo-right5.png";
import bg_left from "../../images/more/bg-logo-left4.png";
import CoffeeItem from "../CoffeeItem/CoffeeItem";
import { Link } from "react-router";

const PopularProducts = ({ coffeeDataArray }) => {
  const [coffeeData, setCoffeeData] = useState(coffeeDataArray);
  return (
    <div
      className="bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bg_color})` }}
    >
      <div
        className="h-screen  bg-no-repeat  bg-center "
        style={{
          backgroundImage: `url(${bg_left}),url(${bg_right})`,
          backgroundPosition: "left top 50px, right bottom",
        }}
      >
        <div className="text-center pt-[50px]">
          <p>--- Sip & Savor ---</p>
          <h1>Our Popular Products</h1>
          <button className="px-3 py-1 border-2 border-[#331A15] text-white bg-[#E3B577] rounded-md hover:rounded-4xl">
            <Link to={"/add-coffee"}>Add Coffee</Link>
          </button>
        </div>
        {/* item coffee list */}
        <div className="w-10/12 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-7">
          {coffeeData.map((coffee) => (
            <CoffeeItem key={coffee._id} coffee={coffee} coffeeData={coffeeData} setCoffeeData={setCoffeeData}></CoffeeItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
