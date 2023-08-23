const connection = require('../config/connection');
const User = require('../models/user');


connection.on('error', (err) => err);

const users = [ {
    username: 'Johnny',
    email: 'Johnyn123@gmail.com',
    thoughts: ['2134', 'apples'],
  },
  {
    username: 'Alice',
    email: 'alice123@gmail.com',
    thoughts: ['5678', 'bananas'],
  },
  {
    username: 'Bob',
    email: 'bob567@gmail.com',
    thoughts: ['9876', 'oranges'],
  },
  {
    username: 'Emily',
    email: 'emily89@gmail.com',
    thoughts: ['4567', 'pears'],
  },
  {
    username: 'David',
    email: 'david456@gmail.com',
    thoughts: ['1234', 'grapes'],
  },
  {
    username: 'Sarah',
    email: 'sarah456@gmail.com',
    thoughts: ['7890', 'strawberries'],
  },
  {
    username: 'Michael',
    email: 'michael789@gmail.com',
    thoughts: ['2345', 'blueberries'],
  },
  {
    username: 'Olivia',
    email: 'olivia123@gmail.com',
    thoughts: ['8901', 'raspberries'],
  },
  {
    username: 'William',
    email: 'william234@gmail.com',
    thoughts: ['3456', 'blackberries'],
  },
  {
    username: 'Sophia',
    email: 'sophia345@gmail.com',
    thoughts: ['9012', 'kiwi'],
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