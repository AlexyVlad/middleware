import fs from 'fs'
import { hashSync, genSaltSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import randomEmail from 'random-email'
import _ from 'lodash'

import { User, Token, Furniture, Category, Cart } from "./models.js"
import { SECRET_KEY } from "../secret.js"

let categories = [
    {
        "name": "Диваны",
    },
    {
        "name": "Кровати",
    },
    {
        "name": "Столы",
    },
    {
        "name": "Интерьерные кресла",
    },
    {
        "name": "Тумбы",
    }
]

let furnitures = [
    {
        name: "«King» Savana",
        color: "Шоколадный",
        width: 250,
        height: 82,
        deep: 115,
        image: "https://ufa.pushe.ru/upload/iblock/ed8/mrnk3pd2fou5ub68g8g6qj8z2mqfj0ds.jpg"
    },
    {
        name: "Кресло «Волана» Swiss velvet 02",
        color: "Бирюзовый",
        width: 84,
        height: 75,
        deep: 76,
        image: "https://ufa.pushe.ru/upload/iblock/ea5/s73ydt4bucyjsvrknejs409333ie7kks.jpg"
    },
    {
        name: "Кровать «Титан Лофт 90»",
        color: "Белый",
        width: 198,
        height: 80,
        deep: 96,
        image: "https://ufa.pushe.ru/upload/iblock/1d2/es11aztdhx7tfas9mn6hdvi8uin6z5h9.jpg"
    },
    {
        name: "Компьютерный стол «Маркос» с подъемным механизмом",
        color: "Белый",
        width: 75,
        height: 75,
        deep: 120,
        image: "https://ufa.pushe.ru/upload/iblock/255/sjtb1q2xflu4bayd7k346h63bjkc4jlh.jpg"
    },
    {
        name: "Прикроватная тумба «Верона»",
        color: "Синий",
        width: 41,
        height: 44,
        deep: 41,
        image: "https://ufa.pushe.ru/upload/iblock/270/h5r1kasbtqjnbqeju7d8g30nnqkcvh4p.jpg"
    }
]

export async function initDB() {
    await Category.bulkCreate(categories).then(async (res) => {
        for (let i = 0; i < furnitures.length; i++) {
            const newFurniture = await Furniture.create(furnitures[i])
            newFurniture.categoryId = res[i].id
            let date = new Date()
            const response = await fetch(furnitures[i].image)
            const buffer = await response.arrayBuffer()
            let fileName = `${furnitures[i].name}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}.jpg`
            fs.writeFile(`${process.cwd()}\\media\\${fileName}`, new Uint8Array(buffer), () => {
                console.log('Finishing downloading!')
            })
            newFurniture.image = `/media/${fileName}`
            await newFurniture.save()
        }
    })

    for (let userId = 1; userId <= 5; userId++) {
        const newUser = await User.create({
            email: randomEmail({ domain: 'mail.ru' }),
            password: hashSync('333', genSaltSync())
        })
        newUser.isActivated = true
        await newUser.save()

        const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '12h' })
        await Token.create({
            userId,
            token
        })

        const furnitureAmount = _.random(1, 8, false)
        const cart = await Cart.create({ userId })
        newUser.cartId = cart.id
        await newUser.save()

        for (let i = 0; i < furnitureAmount; i++) {
            const furniture = await Furniture.findByPk(_.random(1, furnitures.length, false))
            await cart.addFurniture(furniture, { through: { amount: _.random(1, 5, false) } })
        }
    }
}
