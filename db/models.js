import { STRING, INTEGER, FLOAT, BOOLEAN } from 'sequelize'
import { seq } from './index.js'


const Furniture = seq.define('furniture', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    },
    color: {
        type: STRING,
        allowNull: false,
    },
    width: {
        type: FLOAT,
        allowNull: false,
    },
    height: {
        type: FLOAT,
        allowNull: false,
    },
    deep: {
        type: FLOAT,
        allowNull: false,
    },
    image: {
        type: STRING,
        allowNull: false,
    }
})

const Category = seq.define('category', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    }
})

const User = seq.define('user', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    isActivated: {
      type: BOOLEAN,
      defaultValue: false,
    }
})

const Token = seq.define('token', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    token: {
      type: STRING,
      allowNull: false,
    }
})

const Cart = seq.define('cart', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    }
})

const Cart_Furniture = seq.define('cart_furniture', {
    amount: {
      type: INTEGER,
      defaultValue: 1
    }
})

Category.hasOne(Furniture, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
User.hasOne(Token, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Furniture.belongsToMany(Cart, { through: Cart_Furniture })
Cart.belongsToMany(Furniture, { through: Cart_Furniture })
Cart.hasOne(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { User, Token, Cart, Furniture, Category, Cart_Furniture }
