import { Router } from "express";
import { createOrder, verifyPayment } from "../Controllers/Payment";

const paymentRouter = Router()

paymentRouter.post('/create_order', createOrder )
paymentRouter.post('/verify_payment', verifyPayment)


export default paymentRouter``