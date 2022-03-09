import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import "./CreateProduct.css"
import seller from "./images/sell.png"


function CreateProduct() {
    const history= useHistory()
    const formik = useFormik({
        initialValues: {
            productName: "",
            description: "",
            price: "",
            // image: ""
        },
        onSubmit: async (values) => {
            await axios.post("https://cheak.herokuapp.com/create")
            history.push("/")
        }
    })
    return (


        <div className='background' >
            <h3 className='heading'>SELL YOUR PRODUCT</h3>
            <div className='CreateProduct'>

                <form className='form' onSubmit={formik.handleSubmit}>
                    <label>Product Name</label><br />
                    <input name='ProductName' type="text" placeholder='Enter your Product Name' onChange={formik.handleChange}
                        values={formik.values.productName}></input><br /><br />

                    <label>Description</label><br />
                    <textarea name="description" rows="5" cols="40" className='textarea' placeholder='Enter your Description' onChange={formik.handleChange}
                        values={formik.values.description}></textarea><br /><br />
                    <label>Set Price in INR</label><br />
                    <input name="price" type="number" placeholder='Product Price in INR' onChange={formik.handleChange}
                        values={formik.values.price}></input><br /><br />
                    {/* <label>Select your Product Image</label><br />
                    <input name="image" type="file" accept='image/png,image/jpg,image/jpeg' onChange={formik.handleChange}
                        values={formik.values.image} ></input><br /><br /> */}
                    <input className='Button' type="submit"></input>

                </form>
            </div>
        </div>


    )
}

export default CreateProduct