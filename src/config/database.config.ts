import { MongooseModuleOptions } from "@nestjs/mongoose";


export const mongooseConfig = (): MongooseModuleOptions => ({
    uri: process.env.DB_URL,
    autoIndex: true
})