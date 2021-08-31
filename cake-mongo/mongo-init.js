rs.initiate();

db = db.getSiblingDB('cake')

db.createUser({
  user: 'cake-admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'cake',
    },
  ],
});


db.createCollection('counters');
db.createCollection('products');
db.createCollection('types');
db.createCollection('users');


db.counters.createIndex({key: 1});
db.products.createIndex({id: 1});
db.types.createIndex({id: 1});
db.users.createIndex({username: 1});



db.users.insertMany([
 /* 1 */
{
    username: "luana",
    mail: "luana@cake.it",
    completeName: "Luana Dolce",
    password: "password"
},

/* 2 */
{
    username: "Maria",
    mail: "maria@cake.it",
    completeName: "Maria Zucchero",
    password: "password"
},
])

db.counters.insertMany([
 /* 1 */
{
    key: "productTypes",
    counter: 4
},

/* 2 */
{
    key: "products",
    counter: 4
}
])

db.types.insertMany([
 /* 1 */
{
  id: 1,
  label: "Torta al limone",
  description: "Una buonissima torta al limone",
  price: 7.5,
  ingredients: [{ name: "limone", quantity: 2, measure: "qta" }, { name: "farina", quantity: 400, measure: "gr" }, { name: "zucchero a velo", quantity: 20, measure: "gr" }, { name: "zucchero", quantity: 50, measure: "gr" } , { name: "lievito", quantity: 20, measure: "gr" }, { name: "uova", quantity: 2, measure: "qta" }],
},

/* 2 */
{
  id: 2,
  label: "Torta al cioccolato",
  description: "Una gustosa torta di cioccolata",
  price: 8.50,
  ingredients: [{ name: "cioccolata", quantity: 250, measure: "gr" }, { name: "farina", quantity: 400, measure: "gr" }, { name: "burro", quantity: 250, measure: "gr" }, { name: "lievito", quantity: 20, measure: "gr" }, { name: "zucchero", quantity: 50, measure: "gr" } , { name: "uova", quantity: 3, measure: "qta" }],
},

/* 3 */
{
  id: 3,
  label: "Babbà",
  description: "Un dolce della tradizione napoletana",
  price: 5.00,
  ingredients: [{ name: "rum", quantity: 250, measure: "ml" }, { name: "farina", quantity: 125, measure: "gr" }, { name: "burro", quantity: 50, measure: "gr" },  { name: "lievito", quantity: 20, measure: "gr" },{ name: "zucchero", quantity: 50, measure: "gr" } , { name: "uova", quantity: 2, measure: "qta" }, { name: "limone", quantity: 1, measure: "qta" }],
},

/* 4 */
{
  id: 4,
  label: "Biscottini carini",
  description: "Degli ottimi biscottini per il tuo te delle cinque",
  price: 3.50,
  ingredients: [{ name: "vaniglia", quantity: 50, measure: "gr" }, { name: "farina", quantity: 200, measure: "gr" },  { name: "lievito", quantity: 20, measure: "gr" },{ name: "burro", quantity: 250, measure: "gr" }],
},

])

   

