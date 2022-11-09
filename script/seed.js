'use strict'

const {db, models: {User, CartItem, Order} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */


function createNameOrPassword(info){
  let name = ""
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", 
                    "h", "i", "j", "k", "l", "m", "n", "o", "p","q","r","s","t","u","v","w","x","y","z"]
  for (let i = 0; i < 4; i++){
    const randomnum = Math.floor(Math.random() * (25 - 1 + 0) + 0.0)
    if(info === "name" && i === 0 ){
      name += alphabet[randomnum].toUpperCase()
    } else {
      name += alphabet[randomnum]
    }
  }
  return name
}

function isAdmin(){
  const randomNum = Math.floor(Math.random() * (2 - 1 + 1) + 1)
  if(randomNum === 2){
    return true
  } else {
    return false
  }
}

function createEmail(){
  let name = ""
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", 
                    "h", "i", "j", "k", "l", "m", "n", "o", "p","q","r","s","t","u","v","w","x","y","z"]
  for (let i = 0; i < 4; i++){
    const randomnum = Math.floor(Math.random() * (25 - 1 + 0) + 0.0);
    name += alphabet[randomnum]
  }
  name += "@gmail.com"
  return name
}

function createQuantity(){
  const randomNum = Math.floor(Math.random() * (21))
  return randomNum
}

function createUserId(){
  const randomNum = Math.floor(Math.random() * (100 - 1 + 1) + 1)
  return randomNum
}

function createNumberInfo(info){
  let randomNum 
  if(info === "zipcode"){
    randomNum = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
  } else if (info === "phone") {  
    randomNum = Math.floor(Math.random() * (9999999999 - 1000000000 + 1 ) + 1000000000)
  } else if (info === "creditCard"){
    randomNum = Math.floor(Math.random() * (9999999999999999 - 1000000000000000 + 1) + 1000000000000000)
  }
  return randomNum
}

function createLocationName(location){
  let name = ""
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", 
                    "h", "i", "j", "k", "l", "m", "n", "o", "p","q","r","s","t","u","v","w","x","y","z"]
  for (let i = 0; i < 4; i++){
    const randomnum = Math.floor(Math.random() * (25 - 1 + 0) + 0.0);
    if(i === 0 ){
      name += alphabet[randomnum].toUpperCase()
    } else {
      name += alphabet[randomnum]
    }
    
  }
  if(location === "street"){
    name += " Street"
  } else if(location === "city"){
    name += " City"
  } else if (location === "state"){
    name += " State"
  } else if (location === "country"){
    name += "Country"
  }
 
  return name
}


const users = []
for(let i = 0; i < 100; i++){
  users.push({
    firstName: createNameOrPassword("name"),
    lastName: createNameOrPassword("name"),
    username: createNameOrPassword(),
    password: createNameOrPassword(),
    isAdmin: isAdmin(),
    email: createEmail()
  })
}

const cartItems = []
for(let j = 0; j < 500; j++){
  cartItems.push({quantity: createQuantity()})
}

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  await Promise.all(users.map( async (user) => await User.create(user)))

  // Creating Cart Items
  await Promise.all(cartItems.map( async (cartItem) => await CartItem.create(cartItem)))

  const allCartItems = await CartItem.findAll()
  await Promise.all(allCartItems.map(async (cartItem) => await cartItem.setUser(createUserId())
  ))

  // Creating Orders
  const orders = users.map( user => {
    return {
            firstName: user.firstName,
            lastName: user.lastName,
            addressLine1: createLocationName("street"),
            addressLine2: createLocationName("street"),
            city: createLocationName("city"),
            state: createLocationName("state"),
            country: createLocationName("country"),
            zipcode: createNumberInfo("zipcode"),
            phone: createNumberInfo("phone"),
            email: user.email,
            creditCard: createNumberInfo("creditCard")
          }
  })

  await Promise.all(orders.map(async (order) => await Order.create(order)))
  const allOrders = await Order.findAll()
  await Promise.all(allOrders.map(async (order) => {
    const user = await User.findOne({
      where: {firstName: order.firstName}
    })
    await order.setUser(user)
  }))

   
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
