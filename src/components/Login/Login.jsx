import { Input } from "@nextui-org/react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    let { setuserLogin } = useContext(UserContext);
    let navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function handleLogin(formValues) {
        setIsLoading(true);
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/auth/signin`,
                formValues
            )
            .then((apiResponse) => {
                navigate("/");
                setIsLoading(false);
                if (apiResponse.data.message === "success") {
                    localStorage.setItem("userToken", apiResponse.data.token);
                    setuserLogin(apiResponse.data.token);
                    console.log(
                        "userToken from login",
                        localStorage.getItem("userToken")
                    );
                }
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse.response.data.message);
            });
    }

    let yupValidation = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
            )
            .required("Password is required"),
    });
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleLogin,
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
                Log in to Exclusive
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

                <div className="flex items-center justify-between">
                    <button type="submit" className={style.customButton}>
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            "Login"
                        )}
                    </button>
                    <span className="ml-4">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className=" hover:underline"
                            style={{ color: "#db4444" }}
                        >
                            Register now
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
