const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    surName: String,
    gender: String,
    bday: Date,
    email: String,
    phone: String,
    image: {
        type: String,
        default: "http://placehold.it/150x150"
    },
    bio: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: 'http://example.com'
    },
    location: {
        type: String,
        default: 'N/A'
    },
    socialLinks: {
        type: Object,
        default: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Profile", profileSchema)