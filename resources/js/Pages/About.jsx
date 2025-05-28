import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="About" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Informācija par šo aplikāciju</h1>
                <p>
                    Šī ir budžeta plānošanas aplikācija, kas sniedz iespēju lietotājiem sekot līdzi savam ienākumu un izdevumu balansam.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}