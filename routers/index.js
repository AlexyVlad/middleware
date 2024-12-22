import { Router } from "express";
import { categoryRouter } from "./category.js";
import { furnitureRouter } from "./furniture.js"
import { cartRouter } from "./cart.js"
import { authRouter } from "./auth.js"
import { verifyToken } from "../middleware/token.js"


export const router = new Router()

router.use('/categories', verifyToken, categoryRouter)
router.use('/furnitures', verifyToken, furnitureRouter)
router.use('/cart', verifyToken, cartRouter)
router.use('/auth', authRouter)
