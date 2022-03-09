import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import { useStatevalue } from './StateProvider';
import "./Payment.css"
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "./axios"

function Payment() {
    const [{ basket, user }, dispatch] = useStatevalue();
    const stripe = useStripe()
    const elements = useElements()
    const history=useHistory()

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    let abc = basket.map((element) =>
        element.price

    )
    let num = abc.reduce((element, add) => element + add, 0)


    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                //stripe expects total in currencies sub-units
                url: `/payments/create?total=${num*100}`,

            })
            setClientSecret(response.data.clientSecret)
            console.log(response.data)
        }
        getClientSecret();
    },[basket])
    console.log(clientSecret)

    const handleSubmit = async (event) => {
        //stripe magic
        event.preventDefault();
        setProcessing(true);
        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            history.replace("/orders")
        })


    }
    const handleChange = (event) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>   )
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>

                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>no 430,A.K vakkam</p>
                        <p>chennai-601103</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Reveiw items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat

                                    renderText={(value) => (
                                        <h3>Order Total : {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={num}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'INR '}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Pay-Now"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
