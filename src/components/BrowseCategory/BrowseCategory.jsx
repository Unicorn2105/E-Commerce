import React, { useEffect, useState } from "react";
import style from "./BrowseCategory.module.css";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleLeft);
library.add(faCircleRight);

export default function BrowseCategory() {
    const [categories, setCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0); // Manage index for displayed categories
    const itemsPerPage = 6; // Number of items to display at once

    // Fetch categories from the API
    function getCategories() {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setCategories(data.data);
            })
            .catch((apiResponse) => {
                console.log(apiResponse.response.data.message);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    // Handlers for navigation
    const handleNext = () => {
        if (startIndex + itemsPerPage < categories.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    // Get the currently visible categories
    const visibleCategories = categories.slice(
        startIndex,
        startIndex + itemsPerPage
    );

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
                        <span className={style.CategoryText}>Categories</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className={style.BrowseText}>Browse By Category</h1>
                        <div className="flex space-x-2">
                            <FontAwesomeIcon
                                icon="fa-solid fa-circle-left"
                                className={`text-2xl ${
                                    startIndex === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                                onClick={handlePrevious}
                            />
                            <FontAwesomeIcon
                                icon="fa-solid fa-circle-right"
                                className={`text-2xl ${
                                    startIndex + itemsPerPage >=
                                    categories.length
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                                onClick={handleNext}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-7 mb-[60px]">
                    {visibleCategories.map((category) => (
                        <Card
                            radius="lg"
                            className="w-[170px] h-[145px] border border-black/30 hover:bg-[#db4444] hover:text-white transition-colors duration-300"
                        >
                            <CardBody className="flex justify-center items-center overflow-hidden h-full">
                                <Image
                                    alt={category.name}
                                    src={category.image}
                                    className="w-[100px] h-[100px] object-contain"
                                />
                            </CardBody>
                            <CardFooter className="flex justify-center">
                                <span className="text-sm">{category.name}</span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="w-full border-t border-black opacity-10 my-2"></div>
            </div>
        </>
    );
}
