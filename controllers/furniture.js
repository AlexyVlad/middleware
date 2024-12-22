import path from "path"
import _ from "lodash"
import { Furniture } from "../db/models.js";


class FurnitureController {
    async getAll(req, res) {
        const furnitures = await Furniture.findAll()
        res.status(200).json(furnitures)
    }

    async getOne(req, res) {
        const furniture = await Furniture.findOne({ where: { id: req.params.id } })
        return res.status(200).json(furniture)
    }

    async create(req, res) {
        const newFurniture = {
            categoryId: req.body.categoryId,
            name: req.body.name,
            color: req.body.color,
            width: req.body.width,
            height: req.body.height,
            deep: req.body.deep,
        }

        const { image } = req.files
        let imageName = `${newFurniture.name}.jpg`
        const __dirname__ = path.resolve()

        image.mv(path.resolve(__dirname__, 'uploads', imageName))

        newFurniture["image"] = `/uploads/${imageName}`

        const furniture = await Furniture.create(newFurniture)
        return res.status(201).json(furniture)
    }

    async update(req, res) {
        const oldFurniture = await Furniture.findByPk(req.params.id)

        const image = req.files?.["image"] || undefined
        let imageName = oldFurniture.image
        const __dirname__ = path.resolve()

        image?.mv(path.resolve(__dirname__, 'uploads', imageName))

        await Furniture.update({
            categoryId: req.body.categoryId,
            name: req.body.name,
            color: req.body.color,
            width: req.body.width,
            height: req.body.height,
            deep: req.body.deep,
            image: (!_.isUndefined(image))? `/uploads/${imageName}` : undefined
        },
        {
            where: {
                id: req.params.id
            }
        })

        const furniture = await Furniture.findByPk(req.params.id)

        return res.status(200).json(furniture)
    }

    async delete(req, res) {
        await Furniture.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json('The furniture has been successfully deleted!')
    }
}

export default new FurnitureController()
