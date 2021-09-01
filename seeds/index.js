const mongoose = require('mongoose');
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground')
mongoose.connect('mongodb+srv://rxhee:Franklinpark2002!@cluster0.mtsgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '612ed6e1e9001ffc75688d97',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {

                    url: 'https://res.cloudinary.com/dg1uzr1z9/image/upload/v1630188622/YelpCamp/g3awo9quscddxrgls2jp.jpg',
                    filename: 'YelpCamp/g3awo9quscddxrgls2jp'
                },
                {
                    url: 'https://res.cloudinary.com/dg1uzr1z9/image/upload/v1630188622/YelpCamp/rhn9ysnwb5kiq1zwcvl6.jpg',
                    filename: 'YelpCamp/rhn9ysnwb5kiq1zwcvl6'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ullam qui blanditiis doloribus perferendis distinctio esse, sequi nihil debitis reiciendis corporis laudantium deleniti, assumenda iure repellat sed vitae sit repellendus.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});