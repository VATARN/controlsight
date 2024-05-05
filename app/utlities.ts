import prisma from "@/prisma/client";

export const getDatabase = async () => {
const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const done = await prisma.issue.count({ where: { status: "DONE" } });

  return {
    open,
    inprogress,
    done
  };
};