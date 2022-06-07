import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import Payment from "./Payment";

export default function Paypal(props) {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [orderDetails, setorderDetails] = useState([])

   useEffect(() => {
          
           if(success)props.history.push("/payment")
   }, [success])
   
    
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Registration",
                    amount: {
                        currency_code: "USD",
                        value: 0.01,
                    },
                },
            ]
        })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };


    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setSuccess(true);
            console.log(details)
           setorderDetails(details)
        });

    };
  

    const onError = (data, actions) => {
        console.log("actions=", actions, "data=", data)
        setErrorMessage("An Error occured with your payment ");
        console.log("An Error occured with your payment ");
    };
    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AU47C1ye3EoHsb5ksQmoXWzftsHAUbqOp6CxD1T-63v9WIdVqFuKTTxL_sq8I31VAxgrtG6ETArDnQ6i"
            }}>
            <div>
                <div>
                    <button type="submit" onClick={() => setShow(true)}>
                        Buy now
                    </button>
                </div>
            </div>
            <br />
            <div>
                {show ? (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                    />
                ) : null}
            </div>
            {success?<Payment orderDetails={orderDetails}/>:null}
        </PayPalScriptProvider >
    );
}