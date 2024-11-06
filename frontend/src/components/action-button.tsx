"use client"
import React from 'react';
import { Button } from "@/components/ui/button";

import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CreateUserForm } from "@/components/forms/create-user-form";
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ActionButtonProps {
    label: string;
    variant?: 'create' | 'delete';
    disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, variant, disabled=false }) => {
    const variantStyles = {
        create: 'bg-green-500 text-white',
        delete: 'bg-red-500 text-white',
    }

    if (variant == 'create') {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={`${variantStyles[variant]} px-4 py-2 rounded`} disabled={disabled}>
                        {label}
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Create New User </DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new user.
                        </DialogDescription>

                        <CreateUserForm />
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        )
    }

    return (
        <Button
            className={`${variantStyles[variant]} px-4 py-2 rounded`}
            disabled={disabled}
        >
            {label}
        </Button>
    )
}

export default ActionButton;