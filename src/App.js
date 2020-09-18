import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51HSR21DrBnUFtgAP8wsT412SVi33ecPXuCB7khMceiN5GR3Pr5YmQ1DjVGsp5zSpiRNr5Y5RHN9Vct1HrX0mwLh300TndL5RCk"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Mi primer handle");
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/612hLDw1vjL._AC_SY445_.jpg"
        alt="product"
        className="img-fluid"
      />
      <div className="form-group">
        <CardElement />
      </div>
      <button className="btn btn-success">Comprar💰</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
