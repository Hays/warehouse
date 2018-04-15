import mongoose from 'mongoose'

const MONGODB_URL = 'mongodb://127.0.0.1:27017/warehouse'

export let isDBConnected = false

export function initDB() {
    mongoose.connect(MONGODB_URL)
    mongoose.connection.on('connected', () => {
        console.log(`connect mongdb ${MONGODB_URL} success.`)
        isDBConnected = true
    })
    mongoose.connection.on('error', (err) => {
        console.log(`connect mongdb failed, err: ${err}`)
        isDBConnected = false
    })
    mongoose.connection.on('disconnected', () => {
        console.log('disconnect mongdb success.')
        isDBConnected = false
    })
}

export const Schema = mongoose.Schema

export default mongoose