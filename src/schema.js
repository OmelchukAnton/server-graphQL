const Data = require(`../models/data`)

let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLSchema,
	GraphQLID
} = require('graphql');

let {
	GraphQLDate,
  	GraphQLTime,
  	GraphQLDateTime
} = require('graphql-iso-date');




const DateType = new GraphQLObjectType({
	name: 'Data',
	fields: () => ({
		id: { type: GraphQLID },
		username: {type: GraphQLString},
    	date: {type: GraphQLDate}
  	})
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		setTime: {
			type: DateType,
			args: {
				username: { type: GraphQLString },
				date: { type: GraphQLString }
			},
			resolve(parent, args) {
				let newOrder = new Data({
					username: args.username,
					date: args.date,
				});
				return newOrder.save();
			}
		}
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		getTime: {
			type: new GraphQLList(DateType),
			resolve(parent, args) {
				return Data.find({});
			}
		}
	})
});


const AppSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});


module.exports = AppSchema;