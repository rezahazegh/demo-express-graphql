const {GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql");

const TeacherType = new GraphQLObjectType({
    name: 'Teacher',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

module.exports = TeacherType