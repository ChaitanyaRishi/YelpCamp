const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const randomNum = Math.floor(Math.random() * 30);
        const camp = new Campground({
            author: '5fcc28ec2f3f3b49004ba8e0',
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, atque quod nulla consequatur sapiente, iusto exercitationem amet adipisci iure vel aperiam reprehenderit suscipit? Unde enim facere delectus debitis tempora est?',
            geometry: {  
              'type': 'Point',
              'coordinates': [
                cities[randomNum].longitude,
                cities[randomNum].latitude
                ]
            },
            price: Math.floor(Math.random()*10)+10,
            images: [
                {
                  url: 'https://res.cloudinary.com/de3j82ztg/image/upload/v1607379443/YelpCamp/mm65spzot7gp6wz5uuoe.png',
                  filename: 'YelpCamp/eqgrmvj4y09r4fntbflv'
                },
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});