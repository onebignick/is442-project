
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
    onClick?: () => void;
    label: string;
    variant?: 'create' | 'delete';
    disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, variant, disabled = false }) => {
    const variantStyles = {
        create: 'bg-green-500 text-white',
        delete: 'bg-red-500 text-white',
    }

    return (
        <Button
            onClick = {onClick}
            className = {`${variantStyles[variant]} px-4 py-2 rounded`}
            disabled = {disabled}
        >
            {label}
        </Button>
    )
}

export default ActionButton;