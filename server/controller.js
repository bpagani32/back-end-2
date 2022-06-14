const houses = require('./db.json')

let globalID=4
module.exports = {
    getHouse: (req,res) => {
        res.status(200).send(houses)
    },
    deleteHouse: ( req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        //+ is to make sure its a number so it selects properly
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        // console.log(req.body)
        const {address, price, imageURL} = req.body;
        let newHouse = {
            address: address,
            price,
            imageURL,
            id: globalID
        }
        houses.push(newHouse)
        globalID++
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {type} = req.body;
        let index = houses.findIndex(elem => elem.id === +req.params.id)

        if(type === 'minus' && houses[index].price > 0){
            houses[index].price -= 10000;
            res.status(200).send(houses);

        } else if(type === 'plus'){
            houses[index].price += 10000;
            res.status(200).send(houses);

        } else {
            res.status(400).send('Houses cannot be less than free!')
        }
    }
}