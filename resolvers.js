const { PrismaClient } = require('@prisma/client');
const { parse } = require('graphql');
const { parseInt } = require('lodash');
const { GraphQLUpload } = require('graphql-upload');
const prisma = new PrismaClient()

const resolvers = {

    Upload: GraphQLUpload,

    Query:{
        projects:async()=>{
            try{
                return await prisma.project.findMany()
            }catch(error){
                console.error('Error to fetch project details',error)
                throw new Error('Failed to fetch projects detatils')
            }
        },
        project:async(_,{ id })=>{
            try{
                return await prisma.project.findUnique({
                    where:{
                        ProjectId:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch speific project',error)
                throw new Error('Error to fetch specific project')
            }
        },
        companies:async()=>{
            try{
                return await prisma.company.findMany()
            }catch(error){
                console.error('Error to fetch company details',error)
                throw new Error('Failed to fetch company detatils')
            }
        },
        company:async(_,{ id })=>{
            try{
                return await prisma.company.findUnique({
                    where:{companyId:parseInt(id)}
                })
            }catch(error){
                console.error('Error to fetch particular company',error)
                throw new Error('Failed to fetch particular company')
            }
        },
        activities:async()=>{
           try{
            return await prisma.activity.findMany()
           }catch(error){
            console.error('Error to fetch Activites',error)
            throw new Error('Failed to fetch Activites')
           }
        },
        activity:async(_,{ id })=>{
            try{
                return await prisma.activity.findUnique({
                    where:{
                        activityId:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch specific activity',error)
                throw new Error('Failed to fetch specific activity')
        }
        },
        projectStatuss:async()=>{
            try{
                return await prisma.projectStatus.findMany()
            }catch(error){
                console.error('Error to fetch projectstatus',error)
                throw new Error('Failed to fetch projectstatus')
            }
        },
        projectStatus:async(_,{ id })=>{
            try{
                return await prisma.projectStatus.findUnique({
                    where:{
                        projectStatusId:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch specific projectstatus',error)
                throw new Error('Failed to fetch specific projectstatus')
            }
        },
        tasks:async()=>{
            try{
                return await prisma.task.findMany()
            }catch(error){
                console.error('Error to fetch tasks',error)
                throw new Error('Failed to fetch tasks')
            }
        },
        task:async(_,{ id })=>{
            try{
                return await prisma.task.findUnique({
                    where:{
                        taskId:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch specific task',error)
                throw new Error('Failed to fetch specific task')
            }
        },
        taskstatuss:async()=>{
            try{
                return await prisma.taskStatus.findMany()
            }catch(error){
                console.error('Error to fetch taskstatus',error)
                throw new Error('Failed to fetch tasksatatus')
            }
        },
        taskstatus:async(_,{ id })=>{
            try{
                return await prisma.taskStatus.findUnique({
                    where:{
                        taskStatusId:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch specific taskstatus',error)
                throw new Error('Failed to fetch specific taskstatus')
            }
        }
    },
    
    Company: {
        projects: async (parent) => {
            try {
                return await prisma.project.findMany({
                    where: {
                        companyId: parent.companyId
                    },
                    include: {
                        projectStatus: true
                    }
                })
            } catch (error) {
                console.error('Error to fetch company projects', error)
                throw new Error('Failed to fetch company projects')
            }
        },
        projectStatus: async (parent) => {
            try {
                return await prisma.projectStatus.findMany({
                    where: {
                        companyId: parent.companyId
                    }
                })
            } catch (error) {
                console.error('Error to fetch company projectstatus', error)
                throw new Error('Failed to fetch company projectstatus')
            }
        },
        taskStatus: async (parent) => {
            try {
                return await prisma.taskStatus.findMany({
                    where: {
                        companyId: parent.companyId
                    },
                })
            } catch (error) {
                console.error('Error to fetch company taskstatus', error)
                throw new Error('Failed to fetch company taskstatus')
            }
        }
    },

    Project: {
        projectStatus: async (parent) => {
            try {
                return await prisma.projectStatus.findUnique({
                    where: {
                        projectStatusId : parent.projectStatusId    
                    }
                })
            } catch (error) {
                console.error('Error to fetch projectstatus', error)
                throw new Error('Failed to fetch projectstatus')
            }
        }
    },

    Task:{
        taskStatus: async (parent) => {
            try{
                return await prisma.taskStatus.findUnique({
                    where:{
                        taskStatusId: parent.taskStatusId   
                    }
                })

            }catch(error){
                console.error('Error to fetch specific task details status',error)
                throw new Error('Error to fetch specific task details status')
            }
        },
        activity:async(parent)=>{
            try{
                return await prisma.activity.findUnique({
                    where:{
                        activityId:parent.activityId
                    }
                })
            }catch(error){
                console.error('Error to fetch task activity',error)
                throw new Error('Failed to fetch task activity')
            }
        }
    },

    // Project: {
    //     task: async (parent) => {
    //         try{
    //             return await prisma.task.findMany({
    //                 where: {
    //                     projectId: parent.projectId
    //                 }
    //             })
    //         }catch(error){
    //             console.error('Error to fetch projeect task',error)
    //             throw new Error('Faild to fetch project task')
    //         }
    //     },
    //     taskStatus: async (parent) => {
    //         try{
    //             return await prisma.taskStatus.findMany({
    //                 where:{
    //                     projectId: parent.projectId
    //                 }
    //             })
    //         }catch(error){
    //             console.error('Error to fetch project taskstatus',error)
    //             throw new Error('Failed to fetch project taskstatus')
    //         }
    //     }
    // },

    Mutation:{
        createProject:async(_,{ projectName, projectType, projectProgress, TotalRevenue, TotalCost, ProfitMargin, companyId,projectStatusId })=>{
            try{
               const createProject = await prisma.project.create({
                data:{
                    projectName:projectName,
                    projectType:projectType,
                    projectProgress:projectProgress,
                    TotalRevenue:TotalRevenue,
                    TotalCost:TotalCost,
                    ProfitMargin:ProfitMargin,
                    companyId:parseInt(companyId),
                    projectStatusId:parseInt(projectStatusId)
                }
               });return createProject;
        }catch(error){
            console.error('Error to create project',error)
            throw new Error('Failed to create project')
        }

    },
    createCompany:async(_,{ companyName })=>{
        try{
            const createCompany = await prisma.company.create({
                data:{
                    companyName:companyName
                }
            });return createCompany
        }catch(error){
            console.error('Error to crate company',error)
            throw new Error('Failed to create company')
        }
    },
    createActivity:async(_,{ activityName, isBillable, activityDescription })=>{
        try{
            const createActivity = await prisma.activity.create({
                data:{
                    activityName:activityName,
                    isBillable:isBillable,
                    activityDescription:activityDescription
                }
            });
            return createActivity
        }catch(error){
            console.error('Error to create activity',error)
            throw new Error('Failed to create activity')
        }
    },
    createProjectStatus:async(_,{ projectStatusName, projectStatusDescription, projectStatusColor, projectInActive, companyId })=>{
        try{
            const createProjectStatus = await prisma.projectStatus.create({
                data:{
                    projectStatusName:projectStatusName,
                    projectStatusDescription:projectStatusDescription,
                    projectStatusColor:projectStatusColor,
                    projectInActive:projectInActive,
                    companyId:parseInt(companyId)

                }
            });return createProjectStatus
        }catch(error){
            console.error('Error to create project status',error)
            throw new Error('Failed to create project status')
        }
    },
    createTask:async(_,{ startDate, endDate, title, description, priority,  projectType, attachment, activityId, taskStatusId,projectId })=>{
        try{
            const createTask = await prisma.task.create({
                data:{  
                    startDate:startDate,
                    endDate:endDate,
                    title:title,
                    description:description,
                    priority:priority,
                    projectType:projectType,
                    attachment:attachment,
                    activityId:parseInt(activityId),
                    taskStatusId:parseInt(taskStatusId),
                    projectId:parseInt(projectId)
                }
        });return createTask
        }catch(error){
            console.error('Error to create task',error)
            throw new Error('Failed to create task')
        }
    },
    createTaskstatus:async(_,{ taskStatusName, taskStatusDescription,taskStatusColor, taskInActive, taskId, companyId })=>{
        try{
            const createTaskStatus = await prisma.taskStatus.create({
                data:{
                    taskStatusName:taskStatusName,
                    taskStatusDescription:taskStatusDescription,
                    taskStatusColor:taskStatusColor,
                    taskInActive:taskInActive,
                    taskId:parseInt(taskId),
                    companyId:parseInt(companyId)
                }

            });return createTaskStatus
        }catch(error){
            console.error('Error to create taskstatus',error)
            throw new Error('Failed to create taskstatus')
        }
    },
    
  },
}
module.exports = resolvers