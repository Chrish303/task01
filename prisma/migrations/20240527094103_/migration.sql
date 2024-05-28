-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('FIXED', 'TIME_AND_MATERIAL', 'PROGRESSIVE');

-- CreateTable
CREATE TABLE "company" (
    "companyId" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "project" (
    "ProjectId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectType" "ProjectType" NOT NULL,
    "projectProgress" DOUBLE PRECISION NOT NULL,
    "TotalRevenue" DOUBLE PRECISION NOT NULL,
    "TotalCost" DOUBLE PRECISION NOT NULL,
    "ProfitMargin" DOUBLE PRECISION NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("ProjectId")
);

-- CreateTable
CREATE TABLE "task" (
    "taskId" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "projectType" "ProjectType" NOT NULL,
    "taskStatusName" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "project_status" (
    "projectStatusId" SERIAL NOT NULL,
    "projectStatusName" TEXT NOT NULL,
    "projectStatusDescription" TEXT NOT NULL,
    "projectStatusColor" TEXT NOT NULL,
    "projectInActive" BOOLEAN NOT NULL,
    "companyId" INTEGER NOT NULL,
    "ProjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_status_pkey" PRIMARY KEY ("projectStatusId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" SERIAL NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityDescription" TEXT NOT NULL,
    "isBillable" BOOLEAN NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "task-status" (
    "taskStatusId" SERIAL NOT NULL,
    "taskStatusName" TEXT NOT NULL,
    "taskStatusDescription" TEXT NOT NULL,
    "taskStatusColor" TEXT NOT NULL,
    "taskInActive" BOOLEAN NOT NULL,
    "taskId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task-status_pkey" PRIMARY KEY ("taskStatusId")
);

-- CreateTable
CREATE TABLE "_ProjectToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "project_status_projectStatusName_key" ON "project_status"("projectStatusName");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_activityName_key" ON "Activity"("activityName");

-- CreateIndex
CREATE UNIQUE INDEX "task-status_taskStatusName_key" ON "task-status"("taskStatusName");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTask_AB_unique" ON "_ProjectToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTask_B_index" ON "_ProjectToTask"("B");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_activityType_fkey" FOREIGN KEY ("activityType") REFERENCES "Activity"("activityName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_status" ADD CONSTRAINT "project_status_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_status" ADD CONSTRAINT "project_status_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "project"("ProjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task-status" ADD CONSTRAINT "task-status_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task-status" ADD CONSTRAINT "task-status_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTask" ADD CONSTRAINT "_ProjectToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "project"("ProjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTask" ADD CONSTRAINT "_ProjectToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;
