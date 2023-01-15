const {GraphQLObjectType, GraphQLID, GraphQLString} = require("graphql");
const TeacherType = require("./teacher.type");
const Teacher = require("../../models/Teacher");

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        teacher: {
            type: TeacherType,
            resolve(parent, args) {
                return Teacher.findById(parent.teacherId);
            },
        },
    }),
});

module.exports = CourseType;