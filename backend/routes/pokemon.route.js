const { Web3 } = require('web3');
const { Router } = require("express")
const axios = require("axios")

const router = Router()
const web3 = new Web3("http://127.0.0.1:8545")

const ammount = [
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
  5,
  1
]
const data = [
  {
      "id": 1,
      "name": "bulbasaur",
      "height": 0.7,
      "weight": 6.9,
      "species": "Seed Pokémon",
      "types": [
          "poison",
          "grass"
      ],
      "description": "Bulbasaur can be seen napping in bright sunlight.\nThere is a seed on its back. By soaking up the sun’s rays,\nthe seed grows progressively larger.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  {
      "id": 2,
      "name": "ivysaur",
      "height": 1,
      "weight": 13,
      "species": "Seed Pokémon",
      "types": [
          "poison",
          "grass"
      ],
      "description": "There is a bud on this Pokémon’s back. To support its weight,\nIvysaur’s legs and trunk grow thick and strong.\nIf it starts spending more time lying in the sunlight,\nit’s a sign that the bud will bloom into a large flower soon.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
  },
  {
      "id": 3,
      "name": "venusaur",
      "height": 2,
      "weight": 100,
      "species": "Seed Pokémon",
      "types": [
          "poison",
          "grass"
      ],
      "description": "There is a large flower on Venusaur’s back. The flower is said\nto take on vivid colors if it gets plenty of nutrition and sunlight.\nThe flower’s aroma soothes the emotions of people.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  {
      "id": 4,
      "name": "venusaur-mega",
      "height": 2.4,
      "weight": 155.5,
      "species": "Seed Pokémon",
      "types": [
          "poison",
          "grass"
      ],
      "description": "There is a large flower on Venusaur’s back. The flower is said\nto take on vivid colors if it gets plenty of nutrition and sunlight.\nThe flower’s aroma soothes the emotions of people.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10033.png"
  },
  {
      "id": 5,
      "name": "charmander",
      "height": 0.6,
      "weight": 8.5,
      "species": "Lizard Pokémon",
      "types": [
          "fire"
      ],
      "description": "The flame that burns at the tip of its tail is an indication\nof its emotions. The flame wavers when Charmander\nis enjoying itself. If the Pokémon becomes enraged,\nthe flame burns fiercely.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
      "id": 6,
      "name": "charmeleon",
      "height": 1.1,
      "weight": 19,
      "species": "Flame Pokémon",
      "types": [
          "fire"
      ],
      "description": "Charmeleon mercilessly destroys its foes using its sharp\nclaws. If it encounters a strong foe, it turns aggressive.\nIn this excited state, the flame at the tip of its tail flares with\na bluish white color.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
  },
  {
      "id": 7,
      "name": "charizard",
      "height": 1.7,
      "weight": 90.5,
      "species": "Flame Pokémon",
      "types": [
          "flying",
          "fire"
      ],
      "description": "Charizard flies around the sky in search of powerful opponents.\nIt breathes fire of such great heat that it melts anything.\nHowever, it never turns its fiery breath on any opponent\nweaker than itself.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
  {
      "id": 8,
      "name": "charizard-mega-y",
      "height": 1.7,
      "weight": 100.5,
      "species": "Flame Pokémon",
      "types": [
          "flying",
          "fire"
      ],
      "description": "Charizard flies around the sky in search of powerful opponents.\nIt breathes fire of such great heat that it melts anything.\nHowever, it never turns its fiery breath on any opponent\nweaker than itself.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10035.png"
  },
  {
      "id": 9,
      "name": "charizard-mega-x",
      "height": 1.7,
      "weight": 110.5,
      "species": "Flame Pokémon",
      "types": [
          "dragon",
          "fire"
      ],
      "description": "Charizard flies around the sky in search of powerful opponents.\nIt breathes fire of such great heat that it melts anything.\nHowever, it never turns its fiery breath on any opponent\nweaker than itself.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10034.png"
  },
  {
      "id": 10,
      "name": "squirtle",
      "height": 0.5,
      "weight": 9,
      "species": "Tiny Turtle Pokémon",
      "types": [
          "water"
      ],
      "description": "Squirtle’s shell is not merely used for protection.\nThe shell’s rounded shape and the grooves on its\nsurface help minimize resistance in water,\nenabling this Pokémon to swim at high speeds.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
      "id": 11,
      "name": "wartortle",
      "height": 1,
      "weight": 22.5,
      "species": "Turtle Pokémon",
      "types": [
          "water"
      ],
      "description": "Its tail is large and covered with a rich, thick fur. The tail\nbecomes increasingly deeper in color as Wartortle ages.\nThe scratches on its shell are evidence of this Pokémon’s\ntoughness as a battler.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
  },
  {
      "id": 12,
      "name": "blastoise",
      "height": 1.6,
      "weight": 85.5,
      "species": "Shellfish Pokémon",
      "types": [
          "water"
      ],
      "description": "Blastoise has water spouts that protrude from its shell.\nThe water spouts are very accurate.\nThey can shoot bullets of water with enough accuracy\nto strike empty cans from a distance of over 160 feet.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
  },
  {
      "id": 13,
      "name": "blastoise-mega",
      "height": 1.6,
      "weight": 101.1,
      "species": "Shellfish Pokémon",
      "types": [
          "water"
      ],
      "description": "Blastoise has water spouts that protrude from its shell.\nThe water spouts are very accurate.\nThey can shoot bullets of water with enough accuracy\nto strike empty cans from a distance of over 160 feet.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10036.png"
  },
  {
      "id": 14,
      "name": "caterpie",
      "height": 0.3,
      "weight": 2.9,
      "species": "Worm Pokémon",
      "types": [
          "bug"
      ],
      "description": "It’s easy to catch, and it grows quickly, making\nit one of the top recommendations for novice\nPokémon Trainers.",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
  }]

router.get("/pokemons", async (req, res) => {
  const accounts = await web3.eth.getAccounts()
  if (req.query.accountId) {
    return res.json(data.map((pokemon, index) => ({
      ...pokemon,
      accountId: accounts[index],
      ammount: ammount[index]
    })).splice(0, 10).find(pokemon => pokemon.accountId === req.query.accountId))
  }
  return res.json(data.map((pokemon, index) => ({
    ...pokemon,
    accountId: accounts[index],
    ammount: ammount[index]
  })).splice(0, 10))
})





module.exports = router