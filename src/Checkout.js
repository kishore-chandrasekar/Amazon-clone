import React from 'react';
import bannerad from "./images/bannerad.jpg"
import"./Checkout.css"
import Subtotal from './Subtotal';
import { useStatevalue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{basket,user},dispatch]=useStatevalue();
    return <div className='checkout'>
        <div className='checkout__left'>
            <img src={bannerad}></img>
            <div >
                <h3>hello-{user?.email}</h3>
                <h2 className='checkout__title'>
                    Your shopping Cart
                </h2>
                {basket.map(item=>
                    <CheckoutProduct
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    id={item.id}
                 
                    />
                )}
            </div>
        </div>
        <div className='checkout__right'>
            <Subtotal/>
                <h2>Your SubTotal goes here</h2>
        </div>

    </div>;
}

export default Checkout;
