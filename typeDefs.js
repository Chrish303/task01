const { gql } = require('apollo-server');

const typeDefs = gql`
       scalar DateTime

       type Query{
        projects:[Project!]!
        companies:[Company!]!
        activities:[Activity!]!
        projectStatuss:[ProjectStatus!]!
        tasks:[Task!]!
        taskstatuss:[TaskStatus!]!
        company(id:ID!):Company
        project(id:ID!):Project
        activity(id:ID!):Activity
        projectStatus(id:ID!):ProjectStatus
        task(id:ID!):Task
        taskstatus(id:ID!):TaskStatus
       }

       enum ProjectType {
            FIXED
            TIME_AND_MATERIAL
            PROGRESSIVE
        }

type Company{
    companyId: Int!
    companyName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    projects: [Project]
    projectStatus: [ProjectStatus]
    taskStatus: [TaskStatus]
}

type Project{
    ProjectId: Int!
    projectName: String!
    projectType: ProjectType
    projectStatus: ProjectStatus
    projectStatusId: Int!
    projectProgress: Int!
    TotalRevenue: Int!
    TotalCost: Int!
    ProfitMargin: Int!
    company: Company
    companyId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    task: [Task]
}


type ProjectStatus {
    projectStatusId: Int!
    projectStatusName: String!
    projectStatusDescription: String!
    projectStatusColor: String!
    projectInActive: Boolean!
    company: Company
    companyId: Int!
    Projects: Project
    createdAt: DateTime!
    updatedAt: DateTime!
}

type Task {
    taskId: Int!
    startDate: DateTime!
    endDate: DateTime!
    title: String!
    description: String!
    priority: String!
    activity: Activity
    activityId: Int!
    taskStatusId:Int!
    taskStatus: TaskStatus
    projectType: ProjectType
    projectId:Int!
    attachment: String!
    project: Project
    createdAt: DateTime!
    updatedAt: DateTime!
}

type Activity {
    activityId: Int!
    activityName: String!
    activityDescription: String!
    isBillable: Boolean!
    Task: [Task]
}

type TaskStatus {
    taskStatusId: Int!
    taskStatusName: String!
    taskStatusDescription: String!
    taskStatusColor: String!
    taskInActive: Boolean!
    company: Company
    Task: Task
    taskId: Int!
    companyId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type Mutation {

    createCompany(companyName:String!):Company!

    createActivity(activityName:String!, isBillable:Boolean!, activityDescription:String!):Activity!

    createProject(projectName: String!, projectType: ProjectType, projectProgress: Int!, TotalRevenue: Int!, TotalCost: Int!, ProfitMargin: Int!, companyId: ID!, projectStatusId:ID!): Project!

    createProjectStatus(projectStatusName:String!, projectStatusDescription:String!, projectStatusColor:String!, projectInActive:Boolean!, companyId:ID!):ProjectStatus!

    createTaskstatus(taskStatusName:String!, taskStatusDescription:String!, taskStatusColor:String!, taskInActive:Boolean!, taskId:ID!, companyId:ID!):TaskStatus!

    createTask(startDate:DateTime!, endDate:DateTime!, title:String!, description:String!, priority:String!, projectType: ProjectType, attachment:String!, activityId:ID!, taskStatusId:ID!, projectId:ID! ):Task!
}
`

module.exports = typeDefs