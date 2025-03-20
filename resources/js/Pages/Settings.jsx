import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Settings() {
    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow">
                <h2 className="text-xl font-bold ml-32">Iestatījumi</h2>
            </div>
        </AuthenticatedLayout>
    );
}