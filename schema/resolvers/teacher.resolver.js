const {GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString} = require("graphql");
const TeacherType = require("../types/teacher.type");
const Teacher = require("../../models/Teacher");
const Course = require("../../models/Course");

const teacher = {
    type: TeacherType,
        args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Teacher.findById(args.id);
    },
};

const teachers = {
    type: new GraphQLList(TeacherType),
    resolve(parent, args) {
        return Teacher.find();
    },
};

addTeacher = {
    type: TeacherType,
        args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        const teacher = new Teacher({
            name: args.name,
            email: args.email,
            phone: args.phone,
        });

        return teacher.save();
    },
};

deleteTeacher = {
    type: TeacherType,
        args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        Course.find({ teacherId: args.id }).then((courses) => {
            courses.forEach((course) => {
                course.remove();
            });
        });

        return Teacher.findByIdAndRemove(args.id);
    },
};

module.exports = {
    teacher,
    teachers,
    addTeacher,
    deleteTeacher,
}