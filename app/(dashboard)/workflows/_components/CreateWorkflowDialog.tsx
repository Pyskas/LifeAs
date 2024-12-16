"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Layers2Icon } from 'lucide-react';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { useForm } from 'react-hook-form';
import { createWorkflowSchema } from '@/schema/workflow';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function CreateWorkflowDialog({triggerText}: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
      resolver: zodResolver(createWorkflowSchema),
      defaultValues: {},
    })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "Создать рабочий процесс"}</Button>
        </DialogTrigger>
        <DialogContent className="px-0">
            <CustomDialogHeader 
            icon={Layers2Icon} 
            title="Создать рабочий процесс"
            subTitle="Начните свою работу"
            />
            <div className="p-6">
              <Form {...form}>
                <form className="space-y-8 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1 items-center">
                          Название рабочего процесса
                          <p className="text-xs text-primary">(обязательно)</p>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Выберите описание и уникальное название вашего процесса
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                    )}
                    />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1 items-center">
                          Описание рабочего процесса
                          <p className="text-xs text-muted-foreground">(не обязательно)</p>
                          </FormLabel>
                          <FormControl>
                            <Textarea className="resize-none" {...field} />
                          </FormControl>
                          <FormDescription>
                            Напишите описание что представляет это рабочее пространство.
                            <br /> Это необязательно, но поможет вам в будущем вспомнить для чего оно создано
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full">
                      Продолжить
                    </Button>
                </form>
              </Form>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog