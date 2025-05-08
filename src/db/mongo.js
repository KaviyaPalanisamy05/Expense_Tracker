const mongoose = require('mongoose');
mongoose.set('debug', true);
const PASSWORD = "8BARKY1AkO8IqlEQ"
const DATABASE_NAME = 'sample_mflix';
const CONNECTION_URI = `mongodb+srv://Agarshana:<8BARKY1AkO8IqlEQ>@todo.aqncyhd.mongodb.net/`
async function main() {
    await mongoose.connect(CONNECTION_URI, {
        dbName: DATABASE_NAME,
        user: 'Agarshana',
        pass: PASSWORD
    });
}

main().then(() => {
    console.log(`Connected`);
    const commentsSchema = new mongoose.Schema({
        name: String,
        email: String,
        text: String,
        date: String
      });
    const commentsModel = mongoose.model('comments', commentsSchema);
    commentsModel.findOne({}).then(console.log)
    // mongoose.connection.listCollections().then(console.log)
})
main().then(() =>{
    console.log("MongoDb Connected");
}).catch(console.log);
