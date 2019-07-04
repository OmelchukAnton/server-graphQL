const Dates = require('./data/dates');

let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLSchema
} = require('graphql');

let {
	GraphQLDate,
  	GraphQLTime,
  	GraphQLDateTime
} = require('graphql-iso-date');




const DateType = new GraphQLObjectType({
	name: 'QueryDate',
	fields: () => ({
		username: {type: GraphQLString},
    	date: {type: GraphQLDate}
  	})
});


// const Mutation = new GraphQLObjectType({
// 	name: 'Mutation',
// 	fields: () => {
// 		setTime: {
// 			type: DateType,
// 			args: {
// 				username: { type: GraphQLString },
// 				date: { type: GraphQLString }
// 			},
// 			resolve(parent, args) {
// 				const newOrder = new DateType({
// 					username: args.username,
// 					date: args.date,
// 				});
// 				newOrder.save();
// 			}
// 		}
// 	}
// })

const QueryRootType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		getTime: {
			type: DateType,
			args: { username: { type: GraphQLString }},
			resolve(parent, args) {
				return Dates.find(time => time.username === args.username);
			}
		}
	})
});


const AppSchema = new GraphQLSchema({
    query: QueryRootType,
});


module.exports = AppSchema;