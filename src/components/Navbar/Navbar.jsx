import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faHeart,
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import styles from "./NavBar.module.css";
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";

export default function NavBar() {
    let navigate = useNavigate();
    let { userLogin, setuserLogin } = useContext(UserContext);

    function handleLogout() {
        setuserLogin(null);
        localStorage.removeItem("userToken");
        navigate("login");
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.brand}>
                    <p className={styles.brandName}>Carty</p>
                </div>

                <div className={styles.links}>
                    <NavLink to="" className={styles.link}>
                        Home
                    </NavLink>
                    <NavLink to="categories" className={styles.link}>
                        Category
                    </NavLink>
                    <NavLink to="about" className={styles.link}>
                        About
                    </NavLink>
                    <NavLink to="" className={styles.link}>
                        Contact
                    </NavLink>
                </div>

                <div className={styles.actions}>
                    {userLogin !== null && (
                        <>
                            <Input
                                classNames={{
                                    input: "pl-4",
                                }}
                                style={{
                                    width: "243px",
                                    height: "38px",
                                    borderRadius: "4px",
                                }}
                                placeholder="What are you looking for?"
                                endContent={<SearchIcon size={18} />}
                                size="sm"
                                type="search"
                            />
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={styles.icon}
                                style={{
                                    marginRight: "16px",
                                    marginLeft: "24px",
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className={styles.icon}
                                style={{ marginRight: "16px" }}
                            />
                        </>
                    )}

                    <Dropdown>
                        <DropdownTrigger>
                            <FontAwesomeIcon
                                icon={faUser}
                                className={styles.icon}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User menu">
                            {userLogin === null ? (
                                <>
                                    <DropdownItem>
                                        <NavLink
                                            to="login"
                                            className={styles.menuItem}
                                        >
                                            <FontAwesomeIcon
                                                icon={faSignInAlt}
                                                style={{ marginRight: "8px" }}
                                            />
                                            Sign In
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink
                                            to="register"
                                            className={styles.menuItem}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserPlus}
                                                style={{ marginRight: "8px" }}
                                            />
                                            Sign Up
                                        </NavLink>
                                    </DropdownItem>
                                </>
                            ) : (
                                <>
                                    <DropdownItem>
                                        <button
                                            onClick={handleLogout}
                                            className={styles.menuItem}
                                        >
                                            <FontAwesomeIcon
                                                icon={faSignOutAlt}
                                                style={{ marginRight: "8px" }}
                                            />
                                            Logout
                                        </button>
                                    </DropdownItem>
                                </>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className={styles.line}></div>
        </>
    );
}
