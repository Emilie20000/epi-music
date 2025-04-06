import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../Payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";


const stripePromise = loadStripe(
  "pk_test_51PqupeCKzysEQIbT5aIFcS1ML0ajqFDNutYJqEHAsnO4qJTY9HQNr6T79788Cy6Wa4poZQGBDJLjyo39Ejwq9P1K00f0KYpJsH"
);

const PaymentPage = () => {
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId"));
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  const { isDark } = useTheme();
  const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
  const textColor = isDark ? "text-slate-200" : "text-gray-800";
  const borderColor = isDark ?  "border-slate-600" : "border-gray-100";
  const subTextColor = isDark ?  "text-slate-400" : "text-gray-500";

  useEffect(() => {
    if (!orderId) {
      return;
    }

    axios
      .get(`http://localhost:8000/api/order/${orderId}`) //localhost
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId]);

  useEffect(() => {
    if (!order) {
      return;
    }

    if (order.status !== "Pending") {
      navigate("/");
    }
  }, [order]);

  return (
    <div className="w-9/12 m-auto">
      <h1 className={`text-center text-4xl font-bold my-4 ${textColor}`}>Paiement</h1>
      <div className="flex flex-wrap justify-evenly">
        <div className={`w-2/5 max-w-xl ${BgColor} p-8 mt-4 rounded-lg`}>
          {order && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                orderPrice={order.totalWithShippingCost}
                orderId={orderId}
                isDark={isDark}
              />
            </Elements>
          )}
        </div>
        <div className="w-1/3">
          <h3 className={`text-2xl mb-4 ${textColor}`}>Récapitulatif :</h3>
          <div className={`w-full ${BgColor} p-4 rounded-lg`}>
            {order && (
                <>
                  <p className={`text-lg ${textColor}`}>{order.itemsQuantity} produits</p>
                  <hr className="mb-4" />
                  <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    <p>Prix du panier :</p>
                    <p>{order.totalPrice} €</p>
                  </div>
                  <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    <p>Prix du panier avec promotions :</p>
                    <p>{order.totalWithPromo} €</p>
                  </div>
                  <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    <p>Frais de livraison :</p>
                    <p>{order.shippingCost} €</p>
                  </div>
                  <div className={`w-full mt-2 flex justify-between text-xl md:text-3xl ${textColor}`}>
                    <p>Total</p>
                    <p>{order.totalWithShippingCost} €</p>
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
