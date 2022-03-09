import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useStatevalue } from './StateProvider';
import "./Subtotal.css"

function Subtotal() {
    const history=useHistory()
    const [{ basket }, dispatch] = useStatevalue();
    console.log(basket)

    let abc = basket.map((element) =>
        element.price

    )
    let num = abc.reduce((element, add) => element + add, 0)
    

    return <div className='subtotal'>
        <CurrencyFormat
            renderText={(value) => (
                <>
                    <p>SubTotal({basket?.length} items) :<strong>{num}</strong></p>
                    <small className='subtotal__gift'>
                        <input type="checkbox" />This order contains a gift
                    </small>

                </>
            )}
            decimalScale={2}
            value={num}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"INR"}

        />

        <button onClick={(e)=>history.push("/payment")}>Proceed to checkout</button>

    </div>;
}

export default Subtotal;
