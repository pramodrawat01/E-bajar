// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useLocation, useNavigate } from 'react-router-dom'

// const Checkout = () => {

//     const location = useLocation()
//     const {cart, selectedAddress} = location.state || {}
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const [paymentMode, setPaymentMode] = useState('')
//     const [loading, setLoading] = useState(false)

//     const customerNumber = Math.floor(Math.random() * 1000000000)


//     if(!cart || !selectedAddress){
//       return <p> error missting cart or address</p>
//     }

    

//     const handlePlaceOrder = async() => {
//       if(!paymentMode){
//         alert("Please select a payment mode.")
//         return
//       }

//       setLoading(false)

//       try {
//         const products = cart.products.map( (p) => ({
//           productId : p.item._id,
//           quantity : p.qty,
//           price : p.price
//         }));


//         const res = await fetch('', {
//           method : "POST",
//           credentials : "include",
//           headers : {
//             "Content-Type" : "application/json"
//           },
//           body : JSON.stringify({
//             products,
//             totalAmount : cart.totalPrice + cart.totalShipping,
//             deliveryAddress : selectedAddress,
//             paymentMode,
//             customerNumber : customerNumber.toString(),
//           })
//         })

//         const data = await res.json();
//         dispatch({
//           type : "productAdd",
//           payload : {
//             isAdding : true
//           },
//         })

//         if(res.ok) {
//           alert(`oprder placed successfully ! customer numebr : ${customerNumber}`)
//           dispatch({
//             type : "set-cart",
//             payload : {
//               products : [],
//               totalPrice : 0,
//               totalShipping : 0
//             }
//           })

//           navigate('/orders')
//         }
//         else{
//           alert(data.message || "failed to place order")
//         }

//       } catch (error) {
//         console.error(err);
//         alert("something went wrong while placing order !");
//       }
//       finally{
//         setLoading(false)
//       }
//     }

    


//   return (
//     <div>Checkout</div>
//   )
// }

// export default Checkout


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, selectedAddress } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);

  const customerNumber = Math.floor(Math.random() * 1000000000);

  if (!cart || !selectedAddress) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>⚠️ Error: Missing cart or address data.</p>;
  }

  // const handlePlaceOrder = async () => {
  //   if (!paymentMode) {
  //     alert("Please select a payment mode.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {

  //       if (paymentMode === "online") {
  //         try {
  //           // 1. Create Razorpay Order
  //           const res = await fetch(
  //             "https://e-bajar.onrender.com/payment/create_order",
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 totalAmount: cart.totalPrice + cart.totalShipping,
  //               }),
  //             }
  //           );

  //           const data = await res.json();
  //           const order = data.order;

  //           if (!order) {
  //             alert("Failed to create payment order");
  //             return;
  //           }

  //           // 2. Open Razorpay Checkout
  //           const options = {
  //             key: "rzp_test_Rf7yXnYt9LROEk", // <-- Replace with real key
  //             amount: order.amount,
  //             currency: order.currency,
  //             name: "E-Bajar",
  //             order_id: order.id,

  //             handler: async function (response) {
  //               // 3. VERIFY PAYMENT
  //               const verifyRes = await fetch(
  //                 "https://e-bajar.onrender.com/payment/verify_payment",
  //                 {
  //                   method: "POST",
  //                   headers: { "Content-Type": "application/json" },
  //                   body: JSON.stringify({
  //                     razorpay_payment_id: response.razorpay_payment_id,
  //                     razorpay_order_id: response.razorpay_order_id,
  //                     razorpay_signature: response.razorpay_signature,
  //                   }),
  //                 }
  //               );

  //               const verifyData = await verifyRes.json();

  //               if (verifyData.success) {
  //                 alert("Payment Verified Successfully!");

  //                 // Place COD type order now that payment is confirmed
  //                 placeFinalOrder();
  //               } else {
  //                 alert("Payment failed verification");
  //               }
  //             },
  //           };

  //           const rzp = new window.Razorpay(options);
  //           rzp.open();
  //           return; // Stop COD flow
  //         } catch (err) {
  //           console.error(err);
  //           alert("Error initiating online payment");
  //         }
  //       }



  //     const products = cart.products.map((p) => ({
  //       productId: p.item._id,
  //       quantity: p.qty,
  //       price: p.price,
  //     }));


  //     const res = await fetch("https://e-bajar.onrender.com/payment/create_order", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         products,
  //         totalAmount: cart.totalPrice + cart.totalShipping,
  //         deliveryAddress: selectedAddress,
  //         paymentMode,
  //         customerNumber: customerNumber.toString(),
  //       }),
  //     });

  //     const data = await res.json();
  //     dispatch({
  //       type: "productAdd",
  //       payload: { isAdding: true },
  //     });

  //     if (res.ok) {
  //       alert(`Order placed successfully! Customer Number: ${customerNumber}`);
  //       dispatch({
  //         type: "set-cart",
  //         payload: { products: [], totalPrice: 0, totalShipping: 0 },
  //       });
  //       navigate("/orders");
  //     } else {
  //       alert(data.message || "Failed to place order");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong while placing order!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
  if (!paymentMode) {
    alert("Please select a payment mode.");
    return;
  }

  setLoading(true);

  try {
    // ⭐ ONLINE FLOW
    if (paymentMode === "online") {
      const res = await fetch("https://e-bajar.onrender.com/payment/create_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount: cart.totalPrice + cart.totalShipping,
        }),
      });

      const data = await res.json();
      const order = data.order;

      const options = {
        key: "rzp_test_Rf7yXnYt9LROEk",
        amount: order.amount,
        currency: order.currency,
        name: "E-Bajar",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch("https://e-bajar.onrender.com/payment/verify_payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            await placeFinalOrder("online");
          } else {
            alert("Payment Verification Failed!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      return;
    }

    // ⭐ COD FLOW
    if (paymentMode === "cod") {
      await placeFinalOrder("cod");
      return;
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


 const placeFinalOrder = async (mode) => {
  const products = cart.products.map((p) => ({
    productId: p.item._id,
    quantity: p.qty,
    price: p.price,
  }));

  const res = await fetch("https://e-bajar.onrender.com/order/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products,
      totalAmount: cart.totalPrice + cart.totalShipping,
      deliveryAddress: selectedAddress,
      paymentMode: mode,        // online or cod
      customerNumber: customerNumber.toString(),
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Order Placed Successfully!");
    navigate("/orders");
  } else {
    alert(data.message || "Failed to place order");
  }
};


  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "40px auto",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🛒 Checkout</h2>


      <section >
        <h3 >Delivery Address</h3>
        <p><strong>{selectedAddress.fullName}</strong></p>
        <p>{selectedAddress.phone}</p>
        <p>
          {selectedAddress.addressLine1}
          {selectedAddress.addressLine2 ? `, ${selectedAddress.addressLine2}` : ""}
        </p>
        <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipCode}</p>
      </section>


      <section >
        <h3 >Order Summary</h3>
        {cart.products.map((p, idx) => (
          <div key={idx} style={summaryItem}>
            <p>{p.item.productName}</p>
            <p>Qty: {p.qty}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
        <hr />
        <p><strong>Total: ₹{cart.totalPrice}</strong></p>
        <p><strong>Shipping: ₹{cart.totalShipping}</strong></p>
        <p style={{ fontSize: "18px" }}>
          <strong>Grand Total: ₹{cart.totalPrice + cart.totalShipping}</strong>
        </p>
      </section>


      <section >
        <h3 >Payment Mode</h3>
        <label >
          <input
            type="radio"
            value="cod"
            checked={paymentMode === "cod"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>
        <label >
          <input
            type="radio"
            value="online"
            checked={paymentMode === "online"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          Online Payment (Coming Soon)
        </label>
      </section>


      <section >
        <h3 >Terms & Conditions</h3>
        <p>Beyond 7 days you can't exchange and no return possible.</p>
        <p>Your Customer Number: <strong>{customerNumber}</strong></p>
      </section>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.3s",
        }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}