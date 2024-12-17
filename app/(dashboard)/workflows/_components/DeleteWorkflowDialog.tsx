"use client";

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
import { useState } from "react";

 interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
 }

 function DeleteWorkflowDialog({open, setOpen, workflowName }:Props) {
    const [confirmText, setConfirmText] = useState("")
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
                <AlertDialogCancel>Отменить</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== workflowName}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >Удалить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     </AlertDialog>
   )
 }
 
 export default DeleteWorkflowDialog