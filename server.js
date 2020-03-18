var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        goal(id: Int!): Goal,
        goals(topic: String!): [Goal] 
    }

    type Mutation {
        updateGoalTopic(id: Int!, topic: String!): Goal
    }
    type Goal {
        id: Int,
        title: String,
        description: String,
        topic: String,
    }
`)

var goalsData = [
    {
        id: 1,
        title: 'Read 20 books',
        description: '20 books to read in one year.This means reading more than 1.5 books in one month',
        topic: 'personal'
    },
    {
        id: 2,
        title: 'Complete 3 coding projects',
        description: 'Currently working on 1. personal website, 2. goals app and 3. cv editor. I want to have beta versions by the end of the year.',
        topic: 'skills'
    },
    {
        id: 3,
        title: 'Travel cross-continent',
        description: 'I want to do another big time travel this year to Asia or South America',
        topic: 'personal'
    }
];
var getGoal = function(args) {
    var id = args.id;
    return goalsData.filter(goal => {
        return goal.id === id;
    })[0];
}

var getGoals = function(args) {
    if(args.topic) {
        var topic = args.topic;
        return goalsData.filter(goal => goal.topic === topic);
    } else {
        return goalsData;
    }
}

var updateGoalTopic = function(args) {
    goalsData.map(goal => {
        if(goal.id === args.id) {
            goal.topic = args.topic;
            return goal;
        }
    })

    return goalsData.filter(goal => goal.id === args.id)[0];
};

//resolver
var root = {
    goal: getGoal,
    goals: getGoals,
    updateGoalTopic: updateGoalTopic
};

var app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("Express GraphQL server now running on localhost:4000/graphql"))