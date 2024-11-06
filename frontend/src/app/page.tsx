"use client"
import React from 'react';
import ActionButton from "@/components/action-button";
// import UserDataTable from "@/components/datatables/users/UserDataTable";

import { BreadcrumbComponent } from '@/components/breadcrumb-component';

export default function Page() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
    ]

    return (
        <div style={{ padding: '20px' }}>
            <h1>Test Page</h1>

            <BreadcrumbComponent items={breadcrumbItems} />

            {/* <UserDataTable></UserDataTable> */}

            <div style={{ marginBottom: '10px' }}>
                <ActionButton label="Create" variant="create" />
            </div>

            <div>
                <ActionButton label="Delete" variant="delete" />
            </div>

            <br />

            {/* <div>
                <CreateUserForm></CreateUserForm>
            </div> */}

        </div>
    )
}