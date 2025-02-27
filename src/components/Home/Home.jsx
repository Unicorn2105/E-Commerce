import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import FlashSales from "../FlashSales/FlashSales";
import BrowseCategory from "../BrowseCategory/BrowseCategory";
import BestSelling from "../BestSelling/BestSelling";
import OurProducts from "../OurProducts/OurProducts";
export default function Home() {
    return (
        <>
            <FlashSales></FlashSales>
            <BrowseCategory></BrowseCategory>
            <BestSelling></BestSelling>
            <OurProducts></OurProducts>
        </>
    );
}
