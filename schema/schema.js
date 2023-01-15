const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

const TeacherType = require('../schema/types/teacher.type');
const CourseType = require('../schema/types/course.type');

const { course, courses, addCourse, updateCourse, deleteCourse } = require('./resolvers/course.resolver');
const { teacher, teachers, addTeacher, deleteTeacher } = require('./resolvers/teacher.resolver');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    course,
    courses,
    teacher,
    teachers
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTeacher,
    deleteTeacher,
    addCourse,
    updateCourse,
    deleteCourse
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
