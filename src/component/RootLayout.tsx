import {Navigation} from "./Navigation.tsx";
import {Outlet} from "react-router";
import { faBell as faRegularBell } from "@fortawesome/free-regular-svg-icons"; // Regular bell icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../index.css'

export function RootLayout() {
    return (
        <div className="flex w-full h-screen">
            <Navigation/>
            <main className="bg-white p-10 flex-1 my-7 mr-7 rounded-2xl">
                <div className="flex justify-between items-center mb-8 ">
                    <h1 className="text-3xl font-medium text-[#002C2D] playpen">
                        Welcome to Green Shadow !
                    </h1>
                    <div className="flex items-center gap-3">
                        <h1 className="text-md  text-black font-sans" id="userName">
                            Uchithma Senevirathne
                        </h1>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaH95MYy4lQdqXKOR2FCcv2KIHRhz7rCj4N8VKm4zbQmfaOU7lU_m_ykDR6sWGMMEKof8&usqp=CAU"
                            alt=""
                            className="w-[40px] rounded-full"
                        />
                        <FontAwesomeIcon icon={faRegularBell} className="text-[20px] text-gray-600 ml-5" />
                    </div>
                </div>
                <Outlet></Outlet>
            </main>
        </div>
    );
}