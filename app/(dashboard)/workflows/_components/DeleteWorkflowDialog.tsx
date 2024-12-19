"use client";

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
 } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

 interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
 }

 function DeleteWorkflowDialog({open, setOpen, workflowName, workflowId }:Props) {
    const [confirmText, setConfirmText] = useState("");

    const deleteMutation= useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Рабочее пространство успешно удалено", {id: workflowId});
            setConfirmText("");
        },
        onError: () => {
            toast.error("Что то пошло не так", {id: workflowId });
        },
    });

   return (
     <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены что это нужно удалить?</AlertDialogTitle>
                <AlertDialogDescription>
                    Если вы удалите это рабочее пространство, то не сможете его больше вернуть
                    <div className="flex flex-col py-4 gap-2">
                        <p>Если вы уверены, введите <b>{workflowName}</b> что бы подтвердить:</p>
                        <Input
                         value={confirmText}
                          onChange={e => setConfirmText(e.target.value)}
                           />
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmText("")}>Отменить</AlertDialogCancel>
                <AlertDialogAction 
                disabled={confirmText !== workflowName || deleteMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                    toast.loading("Удаление рабочего пространства...", { id: workflowId });
                    deleteMutation.mutate(workflowId)
                }}
                >Удалить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     </AlertDialog>
   )
 }
 
 export default DeleteWorkflowDialog