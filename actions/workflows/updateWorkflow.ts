"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function UpdateWorkflow({
    id,
    definition
}:{
    id: string;
    definition: string;
}) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("unathenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId,
            },
    });

    if (!workflow) {
        throw new Error("рабочее пространство не найдено");
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error("рабочее пространство не черновик");
    }
    await prisma.workflow.update({
        data: {
            definition,
        },
        where: {
            id, 
            userId,
        },
    });
}