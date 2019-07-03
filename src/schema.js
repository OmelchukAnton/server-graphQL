const Dates = require('./data/dates');

let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

let {
	GraphQLDate,
  	GraphQLTime,
  	GraphQLDateTime
} = require('graphql-iso-date');

const DateType = new GraphQLObjectType({
	name: 'Query',
	description: "This represent an author",
	fields: () => ({
    	date: {type: GraphQLDate}
  	})
});


const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Query Root",
  fields: () => ({
    dates: {
      type: new GraphQLList(DateType),
      description: "List of all Dates",
      resolve: function() {
        return Dates
      }
    }
  })
});


const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
});


module.exports = BlogAppSchema;