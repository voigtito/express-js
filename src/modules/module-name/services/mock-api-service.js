const axios = require('axios');
const AppError = require('../../../errors/AppError');

const apiURL = `https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1`

module.exports.getDataFromAPi = async ({page = 1, limit = 1}) => {

  // Deverá ser feita uma requisição para o serviço MockApi realizando a listagem de usuários através da rota GET /users
  let allUsers
  let usersObject = []

  try {
    allUsers = await axios.get(`${apiURL}/users`, {params: {page, limit}});
  } catch (error) {
    console.log(error)
    return new AppError('Error on getting the users from the api', 400);
  }
  // // Para cada usuário retornado, deverá ser feita uma chamada na seguinte rota para resgatar o endereço: "/users/{userId}/address".
  // // Para cada usuário retornado, deverá ser feita uma chamada na seguinte rota para resgatar os contatos: "/users/{userId}/contact".
  for (const user of allUsers.data) {

    let userObject = user

    userObject.fullName = `${user.firstName} ${user.lastName}`
    delete userObject.firstName
    delete userObject.lastName
    delete userObject.avatar

    let allAddressesFromUser
    let userAddresses = []
    try {
      allAddressesFromUser = await axios.get(`${apiURL}/users/${user.id}/address`);
    } catch (error) {
      console.log(error)
      return new AppError('Error on getting the users from the api', 400);
    }

    for (const address of allAddressesFromUser.data) {
      let userAddress = address
      userAddress.addressId = address.id
      userAddress.address = `${address.street} ${address.number}`
      userAddress.countryCode = address.number

      delete address.street
      delete address.number
      delete address.id
      delete address.userId

      userAddresses.push(userAddress)
    }

    userObject.addresses = userAddresses
    usersObject.push(userObject)
    // TODO Contacts (parecido com endereços)
  }
  return usersObject
}
