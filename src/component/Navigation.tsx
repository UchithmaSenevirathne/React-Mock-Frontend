import {Link} from "react-router";
import './Navigation.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faTableCellsLarge, faSeedling, faUsers, faBook, faWrench, faTractor, faListCheck, faSignOut} from "@fortawesome/free-solid-svg-icons";
import leaf from '../assets/images/leaves.png'
import palm from '../assets/images/palm.png'
import '../pages/animation.css'

export function Navigation() {
    return (
        <>
            <header className="bg-[#002C2D]">
                <aside className="w-56 h-screen text-white py-7 flex flex-col items-left">
                    <div className="flex items-center space-x-3 mb-10 justify-center">
                        <h1>GREEN SHADOW</h1>
                    </div>
                    <nav className="space-y-3 pl-6">
                        <ul className="flex flex-col gap-5">
                            <Link to="/dashboard" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faHouse} className=""/>
                                Dashboard
                            </Link>
                            <Link to="/field" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faTableCellsLarge} className=""/>
                                Field
                            </Link>
                            <Link to="/crop" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faSeedling} className=""/>
                                Crop
                            </Link>
                            <Link to="/staff" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faUsers} className=""/>
                                Staff
                            </Link>
                            <Link to="/log" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faBook} className=""/>
                                Monitoring Log
                            </Link>
                            <Link to="/equipment" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faWrench} className=""/>
                                Equipment
                            </Link>
                            <Link to="/vehicle" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faTractor} className=""/>
                                Vehicle
                            </Link>
                            <Link to="/assign" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faListCheck} className=""/>
                                Assign Field
                            </Link>
                            <Link to="/"
                                  className="flex items-center space-x-3 py-2 px-6 text-white gap-3 absolute bottom-5">
                                <FontAwesomeIcon icon={faSignOut} className=""/>
                                Logout
                            </Link>
                        </ul>
                    </nav>
                </aside>
            </header>
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[5%] left-[2%]"
            />
            <img
                src={palm}
                alt=""
                className="absolute rotate-slow top-[15%] left-[8%]"
            />
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[20%] left-[1%]"
            />
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[30%] left-[7%]"
            />
            <img
                src={palm}
                alt=""
                className="absolute rotate-slow top-[50%] left-[1%]"
            />
            <img
                src={palm}
                alt=""
                className="absolute rotate-slow top-[60%] left-[8%]"
            />
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[70%] left-[2%]"
            />
            <img
                src={palm}
                alt=""
                className="absolute rotate-slow top-[85%] left-[1%]"
            />
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[80%] left-[8%]"
            />
            <img
                src={leaf}
                alt=""
                className="absolute rotate-slow top-[95%] left-[8%]"
            />
        </>
    );
}