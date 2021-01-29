const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '600da8de92860e0bc0f66f9f',
            location: `${cities[randomNumber].city}, ${cities[randomNumber].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    "url": "https://res.cloudinary.com/apacloud/image/upload/v1611612996/YelpCamp/sgrfoanmk8x9sskpkagu.jpg",
                    "filename": "YelpCamp/sgrfoanmk8x9sskpkagu"
                }, {
                    "url": "https://res.cloudinary.com/apacloud/image/upload/v1611612997/YelpCamp/pfrjvtyd7z4gd2uuzvhm.jpg",
                    "filename": "YelpCamp/pfrjvtyd7z4gd2uuzvhm"
                }
            ],
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet asperiores consectetur cum dicta ducimus ipsam itaque minima necessitatibus pariatur perferendis perspiciatis praesentium, quasi quia quibusdam rem totam vel!`,
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNumber].longitude,
                    cities[randomNumber].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close().then();
})