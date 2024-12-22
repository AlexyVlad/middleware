import { Router } from 'express'
import FurnitureController from '../controllers/furniture.js'


export const furnitureRouter = new Router()

furnitureRouter.get('/', FurnitureController.getAll)
furnitureRouter.get('/:id', FurnitureController.getOne)
furnitureRouter.post('/', FurnitureController.create)
furnitureRouter.put('/:id', FurnitureController.update)
furnitureRouter.delete('/:id', FurnitureController.delete)
