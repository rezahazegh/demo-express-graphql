const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLEnumType,
} = require("graphql");
const CourseType = require("../types/course.type");
const Course = require("../../models/Course");

const course = {
    type: CourseType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Course.findById(args.id);
    },
};

const courses = {
    type: new GraphQLList(CourseType),
    resolve(parent, args) {
        return Course.find();
    },
};

const addCourse = {
    type: CourseType,
    args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
            type: new GraphQLEnumType({
                name: "CourseStatus",
                values: {
                    new: {value: "Not Started"},
                    progress: {value: "In Progress"},
                    completed: {value: "Completed"},
                },
            }),
            defaultValue: "Not Started",
        },
        teacherId: {type: GraphQLNonNull(GraphQLID)},
    },
    resolve(parent, args) {
        const course = new Course({
            name: args.name,
            description: args.description,
            status: args.status,
            teacherId: args.clientId,
        });

        return course.save();
    },
};

const deleteCourse = {
    type: CourseType,
    args: {
        id: {type: GraphQLNonNull(GraphQLID)},
    },
    resolve(parent, args) {
        return Course.findByIdAndRemove(args.id);
    },
};

const updateCourse = {
    type: CourseType,
    args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {
            type: new GraphQLEnumType({
                name: "CourseStatusUpdate",
                values: {
                    new: {value: "Not Started"},
                    progress: {value: "In Progress"},
                    completed: {value: "Completed"},
                },
            }),
        },
    },
    resolve(parent, args) {
        return Course.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    name: args.name,
                    description: args.description,
                    status: args.status,
                },
            },
            {new: true}
        );
    },
};

module.exports = {
    course,
    courses,
    addCourse,
    deleteCourse,
    updateCourse,
};
