import { Input } from "@nextui-org/react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";

export default function Register() {
    let { setuserLogin } = useContext(UserContext);
    let navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function handleRegister(formValues) {
        setIsLoading(true);
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                formValues
            )
            .then((apiResponse) => {
                navigate("/");
                setIsLoading(false);
                if (apiResponse.data.message === "success") {
                    localStorage.setItem("userToken", apiResponse.data.token);
                    setuserLogin(apiResponse.data.token);
                    console.log(
                        "userToken from register",
                        localStorage.getItem("")
                    );
                }
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse.response.data.message);
            });
    }
    // function myValidation(formValues) {
    //     let errors = {};
    //     if (!formValues.name) {
    //         errors.name = "Name is required";
    //     } else if (!/^[A-Z][a-z]{3,5}$/.test(formValues.name)) {
    //         errors.name =
    //             "Name must start with uppercase letter and not less than 5 letters";
    //     }
    //     if (!formValues.email) {
    //         errors.email = "Email is required";
    //     } else if (
    //         !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //             formValues.email
    //         )
    //     ) {
    //         errors.email = "Invalid Email";
    //     }
    //     return errors;
    // }
    let yupValidation = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .max(10, "Name must be at most 10 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
            .required("Phone number is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
            )
            .required("Password is required"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Password confirmation is required"),
    });
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: handleRegister,
        // validate: myValidation,
        validationSchema: yupValidation,
    });
    return (
        <div className="mx-auto max-w-xl">
            {apiError ? (
                <div
                    className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                    role="alert"
                >
                    {apiError}
                </div>
            ) : null}
            <h1 className="text-3xl font-sans font-bold mb-3">
                Create an account
            </h1>
            <h1 className="text-lg font-sans mb-5">
                {" "}
                Enter your details below
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="gap-4 w-full mb-5">
                    <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        name="name"
                        type="text"
                        variant="underlined"
                        label="First and last name"
                    />
                </div>
                {formik.errors.name && formik.touched.name ? (
                    <div
                        className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                        role="alert"
                    >
                        {formik.errors.name}
                    </div>
                ) : null}
                <div className="gap-4 w-full mb-5">
                    <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        name="email"
                        type="email"
                        variant="underlined"
                        label="Email"
                    />
                </div>
                {formik.errors.email && formik.touched.email ? (
                    <div
                        className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                        role="alert"
                    >
                        {formik.errors.email}
                    </div>
                ) : null}
                <div className="gap-4 w-full mb-5">
                    <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        name="phone"
                        type="tel"
                        variant="underlined"
                        label="Phone Number"
                    />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                    <div
                        className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                        role="alert"
                    >
                        {formik.errors.phone}
                    </div>
                ) : null}
                <div className="gap-4 w-full mb-5">
                    <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        type="password"
                        variant="underlined"
                        label="Password"
                    />
                </div>
                {formik.errors.password && formik.touched.password ? (
                    <div
                        className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                        role="alert"
                    >
                        {formik.errors.password}
                    </div>
                ) : null}
                <div className="gap-4 w-full mb-7">
                    <Input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                        name="rePassword"
                        type="password"
                        variant="underlined"
                        label="Confirm Password"
                    />
                </div>
                {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div
                        className="p-4 mb-4 text-sm  rounded-lg bg-red-50 dark:text-red-800 font-semibold"
                        role="alert"
                    >
                        {formik.errors.rePassword}
                    </div>
                ) : null}
                <button type="submit" className={style.customButton}>
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>
        </div>
    );
}
