import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { registerUser } from '../reducers/UserSlice.ts';
import { useNavigate } from 'react-router-dom';
import {User} from "../models/User.ts";
import leaf from "../assets/images/palm.png";
import './animation.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.user.user)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== repassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = { email, password };
        localStorage.setItem('user', JSON.stringify(userData));

        const newUser = new User(
            email,
            password,
        )

        dispatch(registerUser(newUser));

        alert('Registration successful! Redirecting to login page...');
        navigate('/');
    };

    return (
        <div className="bg-[#002C2D] flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-xl w-96 p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-playpen">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 font-playpen">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-4 py-2 border rounded-3xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#086568] focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 font-playpen">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 border rounded-3xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#086568] focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 font-playpen">Re-enter
                            Password</label>
                        <input
                            type="password"
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 border rounded-3xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#086568] focus:border-transparent"
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#086568] text-white py-2 rounded-3xl focus:outline-none font-medium font-playpen"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/" className="text-[#086568] hover:underline font-playpen">
                        Login
                    </a>
                </p>
            </div>
            <img
                src={leaf}
                alt=""
                className="absolute top-[20%] left-[20%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[10%] left-[5%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[40%] left-[10%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[80%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[70%] left-[25%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[50%] left-[75%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[15%] left-[75%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[80%] right-[10%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[90%] right-[30%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[10%] right-[5%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[80%] left-[5%] rotate-slow"
            />
            <img
                src={leaf}
                alt=""
                className="absolute top-[10%] left-[50%] rotate-slow"
            />
        </div>
    );
};

export default Register;
