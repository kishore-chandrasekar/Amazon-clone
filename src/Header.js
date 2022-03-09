import React, { useState } from 'react';
import amazonlogo from "./images/amazonlogo.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import "./Header.css"
import { Link } from 'react-router-dom';
import { useStatevalue } from './StateProvider';
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

function Header() {
    // const [user,setUser]=useState({})
    // onAuthStateChanged(auth,(currentUser)=>{
    //     setUser(currentUser)
    // })
    const [{ basket, user }, dispatch] = useStatevalue();
    const handleAuthentication = () => {
        if (user) {
            signOut(auth)
        }
    }
    console.log(user)




    return <div className='header'>
        <Link to="/"><img src={amazonlogo} className='header__logo'></img></Link>
        <div className='header__search'>
            <input className='header__searchInput' type="text"></input>
            <SearchIcon className='header__searchIcon' />
        </div>
        <div className='header__nav'>
            <Link to="/login"> <div className='header__option' onClick={handleAuthentication}>
                <span className='header__optionLineOne'>Hello {user ? user : "Guest"}</span>
                <span className='header__optionLineTwo'>{user ? "Sign-Out" : "Sign-In"}</span>
            </div></Link>
            <div className='header__option'>
                <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
            </div>
            <Link to="/createProduct">
                <div className='header__option'>
                    <span className='header__optionLineOne'>Sell</span>
                    <span className='header__optionLineTwo'>Items</span>
                </div>
            </Link>
            <Link to="/checkout"> <div className='header__optionBasket'>
                <ShoppingBasketIcon />
                <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
            </div></Link>

        </div>



    </div>;
}

export default Header;
