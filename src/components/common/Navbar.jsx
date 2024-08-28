import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from '../../services/apiconnector';
import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { categoryEndpoint } from "../../services/apis";

const { CATEGORY_API } = categoryEndpoint;




// const subLinks = [
//     {
//         title: "python",
//         link: "/catalog/python"
//     },
//     {
//         title: "web dev",
//         link: "/catalog/web-development"
//     },
// ]


const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const dispatch = useDispatch();

    const location = useLocation();


    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
            
        try{
            const response = await apiConnector("GET", CATEGORY_API);
            const result = response.data.allTags;
            console.log("result from navbar------------", result);
            setSubLinks(result);
            console.log("sublinks...", subLinks);
        }
        catch(error){
            console.log("Could not fetch categories");
        }
        
    }



    useEffect( () => {
        fetchSubLinks();
    }, [])

    


    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Image */}
                <Link to='/'>
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>


                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map( (link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" 
                                        ? (
                                            <div className='relative flex items-center gap-2 group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown />

                                                <div className='invisible absolute left-[50%]
                                                translate-x-[-50%] translate-y-[80%]
                                                top-[-140%] 
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px] z-10'>

                                                    <div className='absolute left-[50%] top-0 
                                                    translate-x-[80%]
                                                    translate-y-[-45%] h-6 w-6 rotate-45 rounded
                                                    bg-richblack-5'>
                                                    </div>
                                                        {
                                                            subLinks.length 
                                                            ? (
                                                                    subLinks.map( (subLink) => (
                                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={subLink._id}
                                                                            className='rounded-lg bg-transparent pl-4 hover:bg-richblack-50'
                                                                        >
                                                                            <p>{subLink.name}</p>
                                                                        </Link>
                                                                    ))   
                                                            ) 
                                                            : (
                                                                <div></div>
                                                            )
                                                        }


                                                </div>

                                            </div>
                                        ) 
                                        : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : 
                                                    "text-richblack-25"
                                                }`}>
                                                    {link.title}
                                                </p>
                                                
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>


                {/* Login/Signup/Dashboard */}
                <div className='hidden items-center gap-x-4 md:flex'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <FaShoppingCart className='text-2xl text-richblack-100' />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown />
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default Navbar;

