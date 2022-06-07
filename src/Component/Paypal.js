import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// paypal
//   .Buttons({
//     style: {
//       shape: "rect",
//       color: "gold",
//       layout: "horizontal",
//       label: "paypal",
//       tagline: false,
//       height: 52,
//     },
//     createOrder: async function () {
//       const res = await fetch(
//         "https://www.example.it/payment/paypal/order/create/" + orderID,
//         {
//           method: "post",
//           headers: {
//             "content-type": "application/json",
//           },
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       return data.id;
//     },
//     onApprove: async function (data) {
//       const res = await fetch(
//         "https://www.example.it/payment/paypal/" +
//           data.orderID +
//           "/capture/",
//         {
//           method: "post",
//           headers: {
//             "content-type": "application/json",
//           },
//           credentials: "include",
//         }
//       );
//       const details = await res.json();
//       if (localStorage.STBOrder) {
//         localStorage.removeItem("STBOrder");
//       }
//       $("#modalPayments").modal("hide");
//       $("#modalSuccess").modal("show");
//     },
//     onCancel: function (data) {},
//   })
//   .render("#paypal-button-container");
// paypal
// paypal-sandbox

export default function Paypal(props) {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);


    // useEffect(() => {
    //     if (success) {
    //         alert("Payment successful!!");
    //     }
    // },
    //     [success]
    // );

    // console.log(1, orderID);
    // console.log(2, success);
    // console.log(3, ErrorMessage);

    // creates a paypal order
    const createOrder = (data, actions) => {
        debugger
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: 0.01,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
debugger
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            console.log("ppppppp", payer)
            // props.history.push("/payment")
            setSuccess(true);
            // func(data)
        });
    };
    const func =
        async function (data) {
            const res = await fetch(
              "https://www.sandbox.paypal.com/v2/checkout/orders/" +
                data.orderID +
                "/capture",
              {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                credentials: "include",
              }
            );
            console.log(data)
            console.log(res)
        }

    //capture likely error
    const onError = (data, actions) => {
        console.log("actions=", actions, "data=", data)
        // setErrorMessage("An Error occured with your payment ");
        console.log("An Error occured with your payment ");
    };
    return (
        <PayPalScriptProvider
            options={{
                // "client-id": "AT4B1lJTBospxm-cBU-Kbd8p2aUX6Mkn9BbipcrjMTV2kHFajYw2igZu8rBKdn2fHjuj-IeAyKe9hH1t",
                "client-id": "AU47C1ye3EoHsb5ksQmoXWzftsHAUbqOp6CxD1T-63v9WIdVqFuKTTxL_sq8I31VAxgrtG6ETArDnQ6i",
            }}
        >
            <div>
                <div>
                    <div className="wrapper">

                        <div className="product-price-btn">
                            <p>
                                <span>$20</span>
                            </p>
                            <button type="submit" onClick={() => setShow(true)}>
                                Buy now
                            </button>
                        </div>
                    </div>
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

        </PayPalScriptProvider >
    );
}