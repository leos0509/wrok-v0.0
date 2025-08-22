import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });

    const userInfo = {
      taskStats: {
        totalTasks: tasks.length || 0,
        toDoTasks: tasks.filter(task => task.status === "toDo").length || 0,
        inProgressTasks: tasks.filter(task => task.status === "inProgress").length || 0,
        completedTasks: tasks.filter(task => task.status === "completed").length || 0,
        cancelledTasks: tasks.filter(task => task.status === "cancelled").length || 0,
      },
    };

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
