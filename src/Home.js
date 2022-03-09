import React from 'react';
import "./Home.css"
import amazonprime from "./images/amazonprime.jpg"
import Product from './Product';
import productimage from "./images/productimage.jpg"

function Home() {
    return <div className='home'>
        <div className='home__container'>
            <img className='home__image' src={amazonprime}/>
            <div className='home__row'>
                <Product
                    id="1323"
                    title="The Hp chromebook laptop"
                    price={39699}
                    rating={3}
                    image={productimage}
                />
                <Product
                    id="2342"
                    title="The Hp chromebook laptop"
                    price={65878}
                    rating={4}
                    image={productimage}
                />
            </div>
            <div className='home__row'>
                <Product
                    id="6242"
                    title="The Hp chromebook laptop"
                    price={98941}
                    rating={3}
                    image={productimage}
                />
                <Product
                    id="3342"
                    title="The Hp chromebook laptop"
                    price={98918}
                    rating={5}
                    image={productimage}
                />
                <Product
                    id="4311"
                    title="The Hp chromebook laptop"
                    price={24243}
                    rating={2}
                    image={productimage}
                />
            </div>
            <div className='home__row'>
                <Product
                    id="5213"
                    title="The Hp chromebook laptop"
                    price={29892}
                    rating={4}
                    image={productimage}
                />
            </div>

        </div>
    </div>;
}

export default Home;
