import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// CHANGE 1: one currency your sandbox business account supports (USD only works for a US account)
const CURRENCY = "USD"; // e.g. "INR" if your sandbox business account is India-based

function PayPalButton({ amount, onError, onSuccess }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          import.meta.env.VITE_PAYPAL_CLIENTTD,
        currency: CURRENCY,
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: CURRENCY,
                  // CHANGE 2: always a valid 2-decimal string
                  value: Number(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order
            .capture()
            .then((details) => {
              console.log("CAPTURE SUCCESS:", details);

              if (onSuccess) {
                onSuccess(details);
              }
            })
            .catch((error) => {
              console.error("CAPTURE ERROR:", error);

              if (onError) {
                onError(error);
              }
            });
        }}
        onError={(error) => {
          console.error("PAYPAL ONERROR:", error?.message || error);

          if (onError) {
            onError(error);
          }
        }}
        onCancel={(data) => {
          console.log("PAYPAL CANCELLED:", data);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
