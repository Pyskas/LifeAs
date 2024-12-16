import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser';
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, InboxIcon } from 'lucide-react';
import CreateWorkflowDialog from './_components/CreateWorkflowDialog';

function page() {
  return (
    <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">Рабочие процессы</h1>
                <p className="text-muted-foreground">
                    Управление своими рабочими процессами
                </p>
            </div>
            <CreateWorkflowDialog />
            </div>

        <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
                <UserWorkflows />
            </Suspense>
        </div>
    </div>
  )
}

function UserWorkflowsSkeleton() {
    return ( 
    <div className="space-y-2">
        {[1,2,3,4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
        ))}
    </div>
    );
}

async function UserWorkflows() {
    const workflows = await GetWorkflowsForUser();
    if (!workflows) {
        return (
        <Alert variant={"destructive"}>
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>
                Что то пошло не так. Пожалуйста попробуйте снова
            </AlertDescription>
        </Alert>
        );
    }

    if (workflows.length === 0){
        return <div className="flex flex-col gap-4 h-full items-center">
            <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                <InboxIcon size={40} className="stroke-primary" />
            </div>
            <div className="flex flex-col gap-1 text-center">
                <p className="font-bold">Рабочих процессов не создано</p>
                <p className="text-sm text-muted-foreground">
                    Нажмите на кнопку что бы создать ваш первый процесс
                </p>
            </div>
            <CreateWorkflowDialog triggerText="Создайте ваше первое пространство" />
        </div>
    }

    return <div></div>;
}

export default page