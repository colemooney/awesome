
const Post = require('../models/Post')
const mongoose = require('mongoose');



mongoose
  .connect('mongodb://localhost/coleture', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  var postData = [{
    title: 'Amazing article',
    image: 'Judd funny pic',
    text: 'Lorem Ipsum',
    author: 'Judd Apatow'
}, {
    title: 'Did You Hear about michael jackson',
    image: 'Martin sad pic',
    text: 'Filler text',
    author: 'Scorcese'
}, {
    title: 'Terrific News',
    image: 'Wes spicy pic',
    text: 'Lines up lines',
    author: "Anderson"
}]
console.log(postData)

// Post.deleteMany({}, () => null)
// Post.Create(postData)
// Celebrity.deleteMany({}, () => null)
postData.map(data => Post.create(data))
// celebrityData.map(data => Celebrity.create(data))
// mongoose.connection.close()