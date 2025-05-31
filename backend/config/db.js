import mongoose from 'mongoose'

export const ConnectDb = async  () => {
     
    mongoose.connection.on('connected', () => console.log('Mongoose connected successfully'))

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Ai`)
    } catch (error) {
        console.log(error)
    }
}