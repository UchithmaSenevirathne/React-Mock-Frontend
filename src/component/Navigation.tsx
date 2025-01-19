import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faTableCellsLarge,
    faSeedling,
    faUsers,
    faBook,
    faWrench,
    faTractor,
    faListCheck,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import leaf from "../assets/images/leaves.png";
import palm from "../assets/images/palm.png";
import "../pages/animation.css";

export function Navigation() {
    const location = useLocation(); // Get the current route
    const [activeNav, setActiveNav] = useState("/dashboard"); // Default active nav

    useEffect(() => {
        // Set the active nav based on the current route
        setActiveNav(location.pathname);
    }, [location.pathname]);

    const getLinkClasses = (path) => {
        return path === activeNav
            ? "bg-white text-gray-600 custom-link flex items-center gap-3"
            : "text-white custom-link flex items-center gap-3";
    };

    return (
        <>
            <header className="bg-[#002C2D]">
                <aside className="w-56 h-screen  py-7 flex flex-col items-left">
                    <div className="flex items-center space-x-3 mb-10 justify-center">
                        <h1>GREEN SHADOW</h1>
                    </div>
                    <nav className="space-y-3 pl-6">
                        <ul className="flex flex-col gap-5">
                            <Link
                                to="/dashboard"
                                className={getLinkClasses("/dashboard")}
                            >
                                <FontAwesomeIcon icon={faHouse} />
                                Dashboard
                            </Link>
                            <Link
                                to="/field"
                                className={getLinkClasses("/field")}
                            >
                                <FontAwesomeIcon icon={faTableCellsLarge} />
                                Field
                            </Link>
                            <Link
                                to="/crop"
                                className={getLinkClasses("/crop")}
                            >
                                <FontAwesomeIcon icon={faSeedling} />
                                Crop
                            </Link>
                            <Link
                                to="/staff"
                                className={getLinkClasses("/staff")}
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                Staff
                            </Link>
                            <Link
                                to="/log"
                                className={getLinkClasses("/log")}
                            >
                                <FontAwesomeIcon icon={faBook} />
                                Monitoring Log
                            </Link>
                            <Link
                                to="/equipment"
                                className={getLinkClasses("/equipment")}
                            >
                                <FontAwesomeIcon icon={faWrench} />
                                Equipment
                            </Link>
                            <Link
                                to="/vehicle"
                                className={getLinkClasses("/vehicle")}
                            >
                                <FontAwesomeIcon icon={faTractor} />
                                Vehicle
                            </Link>
                            <Link
                                to="/assign"
                                className={getLinkClasses("/assign")}
                            >
                                <FontAwesomeIcon icon={faListCheck} />
                                Assign Field
                            </Link>
                            <Link
                                to="/"
                                className="flex items-center space-x-3 py-2 px-6 text-white gap-3 absolute bottom-5"
                            >
                                <FontAwesomeIcon icon={faSignOut} />
                                Logout
                            </Link>
                        </ul>
                    </nav>
                </aside>
            </header>
            {/* Background animations */}
            <img src={leaf} alt="" className="absolute rotate-slow top-[5%] left-[2%]" />
            <img src={palm} alt="" className="absolute rotate-slow top-[15%] left-[8%]" />
            <img src={leaf} alt="" className="absolute rotate-slow top-[20%] left-[1%]" />
            <img src={leaf} alt="" className="absolute rotate-slow top-[30%] left-[7%]" />
            <img src={palm} alt="" className="absolute rotate-slow top-[50%] left-[1%]" />
            <img src={palm} alt="" className="absolute rotate-slow top-[60%] left-[8%]" />
            <img src={leaf} alt="" className="absolute rotate-slow top-[70%] left-[2%]" />
            <img src={palm} alt="" className="absolute rotate-slow top-[85%] left-[1%]" />
            <img src={leaf} alt="" className="absolute rotate-slow top-[80%] left-[8%]" />
            <img src={leaf} alt="" className="absolute rotate-slow top-[95%] left-[8%]" />
        </>
    );
}
