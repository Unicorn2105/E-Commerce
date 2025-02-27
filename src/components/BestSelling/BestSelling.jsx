import React, { useEffect, useState } from "react";
import style from "./BestSelling.module.css";
import axios from "axios";
import { Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart);
library.add(faEye);
export default function BestSelling() {
    const [bestSelling, setBestSelling] = useState([]);
    // Function to generate star rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half stars
        const emptyStars = 5 - fullStars - halfStars; // Empty stars

        const stars = [];
        for (let i = 0; i < fullStars; i++) stars.push("★");
        if (halfStars) stars.push("☆");
        for (let i = 0; i < emptyStars; i++) stars.push("☆");

        return stars.join("");
    };

    // Function to generate a random discount
    const getRandomDiscount = () => {
        const discountOptions = Array.from(
            { length: 20 },
            (_, i) => (i + 1) * 5
        );
        return discountOptions[
            Math.floor(Math.random() * discountOptions.length)
        ];
    };
    function getBestSales() {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                const shuffled = data.data.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled
                    .slice(0, 4)
                    .map((product) => ({
                        ...product,
                        discount: getRandomDiscount(),
                    }));
                setBestSelling(selectedProducts);
            })
            .catch((apiResponse) => {
                console.log(apiResponse.response.data.message);
            });
    }
    useEffect(() => {
        getBestSales();
    }, []);
    return (
        <>
            <div
                style={{
                    paddingLeft: "135px",
                    marginBottom: "80px",
                    paddingRight: "135px",
                }}
            >
                <div style={{ marginBottom: "60px" }}>
                    <div className="flex items-center">
                        <div className={style.square}></div>
                        <span className={style.monthText}>This Month</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className={style.bestSaleText}>
                            Best Selling Products
                        </h1>
                        <button className={style.customButton}>View All</button>
                    </div>
                </div>
                <div className={style.product} style={{ marginBottom: "60px" }}>
                    {bestSelling.map((product) => (
                        <div style={{ marginRight: "30px" }}>
                            <Card
                                shadow="sm"
                                className="h-[450px]"
                                key={product.id}
                            >
                                <CardHeader className="absolute z-10 top-1 flex-row justify-between items-start w-full">
                                    <div className="flex flex-col ml-auto">
                                        <FontAwesomeIcon
                                            icon="fa-regular fa-heart"
                                            className="text-xl"
                                            style={{ marginBottom: "8px" }}
                                        />
                                        <FontAwesomeIcon
                                            icon="fa-regular fa-eye"
                                            className="text-xl"
                                        />
                                    </div>
                                </CardHeader>

                                <CardBody className="flex justify-center items-center overflow-hidden h-full">
                                    <Image
                                        alt={product.title}
                                        className="w-[200px] h-[200px] object-contain"
                                        src={product.imageCover}
                                    />
                                </CardBody>
                                <div className="p-5">
                                    <b>
                                        {product.title
                                            .split(" ")
                                            .slice(0, 2)
                                            .join(" ")}
                                    </b>
                                    <div className="flex">
                                        <span
                                            className="mr-5"
                                            style={{ color: "#db4444" }}
                                        >
                                            $
                                            {(
                                                product.price *
                                                (1 - product.discount / 100)
                                            ).toFixed(2)}
                                        </span>
                                        <span className={style.beforeSalePrice}>
                                            ${product.price}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <div className={style.starRating}>
                                            {renderStars(
                                                product.ratingsAverage
                                            )}
                                        </div>
                                        <div className={style.rating}>
                                            ({product.ratingsQuantity})
                                        </div>
                                    </div>
                                </div>
                                <button className={style.btn}>
                                    Add To Cart
                                </button>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="w-full border-t border-black opacity-10 my-2"></div>
            </div>
        </>
    );
}
