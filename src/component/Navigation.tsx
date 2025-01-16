import {Link} from "react-router";
import './Navigation.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faTableCellsLarge, faSeedling, faUsers, faBook, faWrench, faTractor, faListCheck} from "@fortawesome/free-solid-svg-icons";

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
                            <Link to="/" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faHouse} className="" />
                                Dashboard
                            </Link>
                            <Link to="/field" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faTableCellsLarge} className="" />
                                Field
                            </Link>
                            <Link to="/crop" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faSeedling} className="" />
                                Crop
                            </Link>
                            <Link to="/staff" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faUsers} className="" />
                                Staff
                            </Link>
                            <Link to="/log" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faBook} className="" />
                                Monitoring Log
                            </Link>
                            <Link to="/equipment" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faWrench} className="" />
                                Equipment
                            </Link>
                            <Link to="/vehicle" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faTractor} className="" />
                                Vehicle
                            </Link>
                            <Link to="/assign" className="custom-link flex items-center gap-3">
                                <FontAwesomeIcon icon={faListCheck} className="" />
                                Assign Field
                            </Link>
                        </ul>
                    </nav>
                </aside>
            </header>
        </>
);
}