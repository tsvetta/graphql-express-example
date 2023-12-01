import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from 'cors';

import schema from './schema/schema.js';

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://tsvetta:<pass>@cluster0.ie3yjvk.mongodb.net/graphql-express-example')
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(4000, () => {
    console.log("Server at port 4000");
})