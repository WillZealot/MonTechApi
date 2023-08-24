const connection = require('../config/connection');
const User = require('../models/user');


connection.on('error', (err) => err);

const users = [ {
    username: 'Johnny',
    email: 'Johnyn123@gmail.com',
  },
  {
    username: 'Alice',
    email: 'alice123@gmail.com',
  },
  {
    username: 'Bob',
    email: 'bob567@gmail.com',
  },
  {
    username: 'Emily',
    email: 'emily89@gmail.com',
  },
  {
    username: 'David',
    email: 'david456@gmail.com',
  },
  {
    username: 'Sarah',
    email: 'sarah456@gmail.com',
  },
  {
    username: 'Michael',
    email: 'michael789@gmail.com',
  },
  {
    username: 'Olivia',
    email: 'olivia123@gmail.com',
  },
  {
    username: 'William',
    email: 'william234@gmail.com',
  },
  {
    username: 'Sophia',
    email: 'sophia345@gmail.com',
  },]
  
  connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
    await User.collection.insertMany(users);
    console.log('database seeded');
    return;
  });