import { Router } from 'express'
import CategoryController from '../controllers/category.js'


export const categoryRouter = new Router()

categoryRouter.get('/', CategoryController.getAll)
categoryRouter.get('/:id', CategoryController.getOne)
categoryRouter.post('/', CategoryController.create)
categoryRouter.put('/:id', CategoryController.update)
categoryRouter.delete('/:id', CategoryController.delete)
