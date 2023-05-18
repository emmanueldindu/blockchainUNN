const mongoose = require('mongoose')

const connect_url = 'mongodb+srv://blockchain:blockchainunn@blockchain.cgzkmio.mongodb.net/'


const connectDb = (url) => {
    return mongoose.connect(connect_url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    }
    
    )
}


module.exports = connectDb




