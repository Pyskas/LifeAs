"use server";

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType ) {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success){
        throw new Error("неверные данные формы");
    }
    const { userId } = await auth(); //Если не работает убрать await

    if (!userId) {
        throw new Error("неавторизован");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            ...data,
        },
    });

    if (!result) {
        throw new Error("Ошибка при создании рабочего пространства");
    }

    redirect(`/workflow/editor/${result.id}`)
}