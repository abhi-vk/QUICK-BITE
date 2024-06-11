const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:mern123@cluster0.yqxajaz.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB = async() => {
  await mongoose.connect(mongoURI).then(async function (results) {
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray().then(async function (data) {
      fetched_data1 = await mongoose.connection.db.collection("food_category");
          const data1 = await fetched_data1.find({}).toArray().then(function (catData) {
            global.food_items = data;
            global.food_category = catData;
            
          
          })
          .catch(function (err) {
            console.log(err);
          });
    })
    .catch(function (err){
      console.log(err);
    });

  })
  .catch(function (err){
    console.log(err)
  });
}
module.exports = mongoDB
  

  
  module.exports = mongoDB