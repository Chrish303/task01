/*
  Warnings:

  - You are about to drop the column `activityType` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `taskStatusName` on the `task` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskStatusId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_activityType_fkey";

-- DropForeignKey
ALTER TABLE "task-status" DROP CONSTRAINT "task-status_taskId_fkey";

-- DropIndex
DROP INDEX "task-status_taskStatusName_key";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "activityType",
DROP COLUMN "taskStatusName",
ADD COLUMN     "activityId" INTEGER NOT NULL,
ADD COLUMN     "taskStatusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskStatusId_fkey" FOREIGN KEY ("taskStatusId") REFERENCES "task-status"("taskStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;
