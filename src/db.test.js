import  { MongoClient } from 'mongodb'
import {expect} from 'chai'
import { async } from 'regenerator-runtime'
import {getUserByUsername} from './db'

describe('getUserByUsername', ()=>{
    it('get the correct username from the database', async ()=>{
        const client = await MongoClient.connect(
            `mongodb://localhost:2717/TEST_DB`,
            {
                useNewUrlParser = true,
                useUnifiedTopology = true
            }
        )
        const db = client.db('TEST_DB')
        const fakeData = [{
            id: '123',
            username: 'Shad',
            email: 'shad@gmail.com'
        },{
            id: '123',
            username: 'Bernice',
            email: 'bernice@gmail.com'
    }]

    await db.collection('users').insertMany(fakeData)
    const actual = await getUserByUsername('Shad')
    const finalDBState = await db.collection('users').find().toArray()
    await db.dropDatabase()
    client.close

    const expected = {
        id: '123',
        username: 'Shad',
        email: 'shad@gmail.com'
    }

    expect(actual).to.deep.equal(expected)
    expect(finalDBState).to.deep.equal(fakeData)
    })
})