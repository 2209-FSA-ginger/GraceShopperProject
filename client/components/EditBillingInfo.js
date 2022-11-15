import React from "react"
import {useSelector, useDispatch} from "react-redux"
import updateInfo from "../store/auth"

const EditBillingInfo = () => {

    const dispatch = useDispatch()
    const {me, isLoggedIn} = useSelector( state => state.auth)

    const handleSubmit = (event) => {
        const submitForm = {} 
       if(event.target.address1) submitForm.address1 = event.target.address1.value
       if(event.target.address2) submitForm.address2 = event.target.address2.value
       if(event.target.city) submitForm.city = event.target.city.value
       if(event.target.state) submitForm.state = event.target.state.value
       if(event.target.country) submitForm.country = event.target.country.value
       if(event.target.zipcode) submitForm.zipcode = event.target.zipcode.value 
       submitForm.userId = user.id
       dispatch(updateInfo(submitForm))  
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Address 1</label>
            <input name="address1"></input>
            <label>Address 2</label>
            <input name="address2"></input>
            <label>City</label>
            <input name="city"></input>
            <label>State</label>
            <input name="state"></input>
            <label>Country</label>
            <input name="country"></input>
            <label>Zipcode</label>
            <input name="zipcode"></input>
        </form>
    )
}

export default editBillingInfo