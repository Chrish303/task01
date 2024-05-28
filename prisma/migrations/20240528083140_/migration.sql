/*
  Warnings:

  - You are about to drop the column `ProjectId` on the `project_status` table. All the data in the column will be lost.
  - You are about to drop the `_ProjectToTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectStatusId` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTask" DROP CONSTRAINT "_ProjectToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTask" DROP CONSTRAINT "_ProjectToTask_B_fkey";

-- DropForeignKey
ALTER TABLE "project_status" DROP CONSTRAINT "project_status_ProjectId_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "projectStatusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "project_status" DROP COLUMN "ProjectId";

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProjectToTask";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_projectStatusId_fkey" FOREIGN KEY ("projectStatusId") REFERENCES "project_status"("projectStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("ProjectId") ON DELETE RESTRICT ON UPDATE CASCADE;
