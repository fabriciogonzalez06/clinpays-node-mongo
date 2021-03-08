import mongoose from 'mongoose';


// export const DB_URL:string='mongodb://127.0.0.1:27017/climpays' || 'mongodb+srv://clinpays:clinpays12345@clinpays.ryqz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


export const getDdUrl = (): string => {

    return process.env.URI_DB_CLINPAYS || 'mongodb://127.0.0.1:27017/climpays';

}

export default (db: string) => {
    const connect = () => {
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return console.log(`Successfully connected`);
            }).catch(error => {
                console.log(`Error connectin to database `, error);
                return process.exit(1);
            });
    }


    connect();

    mongoose.connection.on('disconnected', connect);
}