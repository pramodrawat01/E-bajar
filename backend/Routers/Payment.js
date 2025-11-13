import { Router } from "express";
import { createOrder, verifyPayment } from "../Controllers/Payment.js";

const paymentRouter = Router()

paymentRouter.post('/create_order', createOrder )
paymentRouter.post('/verify_payment', verifyPayment)


export default paymentRouter