const Data = require(`../models/data`)

let {
    GraphQLString,
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
				newOrder.save();
			}
		}
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		getTime: {
			type: DateType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				return Data.findById(args.id);
			}
		}
	})
});


const AppSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});


module.exports = AppSchema;