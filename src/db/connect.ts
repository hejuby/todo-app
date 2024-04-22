import _mongoose, { connect } from "mongoose";

declare global {
    var mongoose: {
        promise: ReturnType<typeof connect> | null;
        conn: typeof _mongoose | null;
    };
}

const MONGODB_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`;

if (!process.env.MONGO_HOST || !process.env.MONGO_PORT) {
    throw new Error("Please add your MongoDB URI to .env file");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = connect(MONGODB_URI, {
            dbName: "default",
            auth: {
                username: process.env.MONGO_USERNAME,
                password: process.env.MONGO_PASSWORD,
            },
            authSource: "admin",
        })
            .then((mongoose) => {
                console.log("✅ New connection established");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ Connection to database failed");
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
