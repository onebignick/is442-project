"use client"
import React from 'react';
import ActionButton from "@/components/action-button";
import { CreateUserForm } from "@/components/forms/create-user-form";

export default function Page() {
    const handleCreate = () => {
        console.log('create button clicked');
    };

    const handleDelete = () => {
        console.log('delete button clicked');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Test Page</h1>

            <div style={{ marginBottom: '10px' }}>
                <ActionButton label="Create" variant="create" onClick={handleCreate} />
            </div>

            <div>
                <ActionButton label="Delete" variant="delete" onClick={handleDelete} />
            </div>

            <br />

            {/* <div>
                <CreateUserForm></CreateUserForm>
            </div> */}

        </div>
    )
}