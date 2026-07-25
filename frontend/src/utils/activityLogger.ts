import prisma from "../config/prisma";

export const logActivity = async (
  userId: string,
  module: string,
  action: string
) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        module,
        action
      }
    });
  } catch (err) {
    console.log(err);
  }
};