import {
    PayPalScriptProvider,
    PayPalHostedFieldsProvider,
    PayPalHostedField,
    usePayPalHostedFields,
} from "@paypal/react-paypal-js";

const SubmitPayment = () => {
    // Here declare the variable containing the hostedField instance
    const hostedFields = usePayPalHostedFields();

    const submitHandler = () => {
        if (!typeof hostedFields.submit !== "function") return; // validate that `submit()` exists before using it
        hostedFields
            .submit({
                // The full name as shown in the card and billing address
                cardholderName: "John Wick",
            })
            .then((order) => {
                //   fetch(
                //       "/your-server-side-integration-endpoint/capture-payment-info"
                //   )
                //       .then((response) => response.json())
                //       .then((data) => {
                //           // Inside the data you can find all the information related to the payment
                //       })
                //       .catch((err) => {
                //           // Handle any error
                //       });
            });
    };

    return <button onClick={submitHandler}>Pay</button>;
};

export default function App1() {
    return (
        <PayPalScriptProvider
            options={{
                // "client-id": "your-client-id",
                "client-id": "AU47C1ye3EoHsb5ksQmoXWzftsHAUbqOp6CxD1T-63v9WIdVqFuKTTxL_sq8I31VAxgrtG6ETArDnQ6i",

                // "data-client-token": "your-data-client-token",
            }}
        >
            <PayPalHostedFieldsProvider
                createOrder={(data, actions) => {
                    // Here define the call to create and order
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
                            //       // not needed if a shipping address is actually needed
                            //       application_context: {
                            //           shipping_preference: "NO_SHIPPING",
                            //       },
                            //   })
                            //   .then((orderID) => {
                            //       setOrderID(orderID);
                            //       return orderID;
                            //   });
                            //   return fetch(
                            //       "/your-server-side-integration-endpoint/orders"
                            //   )
                            //       .then((response) => response.json())
                            //       .then((order) => order.id)
                            //       .catch((err) => {
                            //           // Handle any error
                        });
                }}
            >
                <PayPalHostedField
                    id="card-number"
                    hostedFieldType="number"
                    options={{ selector: "#card-number" }}
                />
                <PayPalHostedField
                    id="cvv"
                    hostedFieldType="cvv"
                    options={{ selector: "#cvv" }}
                />
                <PayPalHostedField
                    id="expiration-date"
                    hostedFieldType="expirationDate"
                    options={{
                        selector: "#expiration-date",
                        placeholder: "MM/YY",
                    }}
                />
                <SubmitPayment />
            </PayPalHostedFieldsProvider>
        </PayPalScriptProvider>
    );
}