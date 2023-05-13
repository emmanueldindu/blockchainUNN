const mongoose = require('mongoose')

const connect_url = 'mongodb+srv://masterdindu:chimnadindu@blockchain.btznmnu.mongodb.net/'


const connectDb = (url) => {
    return mongoose.connect(connect_url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    }
    
    )
}


module.exports = connectDb




