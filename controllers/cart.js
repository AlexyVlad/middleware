import { Cart, Furniture, User, Cart_Furniture } from "../db/models.js"

class CartController {
    async getCart(req, res) {
        const cartId = await (await User.findOne({ email: req.user.email })).dataValues.cartId
        let cart = (await Cart.findOne({ where: { id: cartId }, include: Furniture })).toJSON()

        if (cart) {
            return res.status(200).json({ 'cart': cart })
        }

        return res.status(404).json({ 'cart': null })
    }

    async update(req, res) {
        const { furnitureId, amount } = req.body
        const cart = await Cart.findByPk(req.params.id)

        await cart.addFurniture(await Furniture.findByPk(furnitureId), { through: { amount } })
        await cart.save()

        return res.status(200).json({ 'cart': cart })
    }

    async updateAmount(req, res) {
        const { furnitureId, amount } = req.body
        const cart = await Cart.findByPk(req.params.id)

        const cartFurniture = await Cart_Furniture.findOne({ where: { cartId: cart.id, furnitureId } })
        cartFurniture.amount = amount

        await cartFurniture.save()

        return res.status(200).json({ 'cart': cart })
    }

    async delete(req, res) {
        const { furnitureId } = req.body
        const cart = await Cart.findByPk(req.params.id)

        await cart.removeFurniture(await Furniture.findByPk(furnitureId))
        await cart.save()

        return res.status(200).json({ 'cart': cart })
    }
}

export default new CartController()
