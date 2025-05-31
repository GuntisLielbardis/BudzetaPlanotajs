import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Par aplikāciju" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Informācija par šo budžeta plānošanas aplikāciju</h1>
                <p class="text-lg ml-8 mr-8">
                    Šī ir budžeta plānošanas aplikācija, kas sniedz iespēju šīs sistēmas lietotājiem sekot līdzi savam ienākumu un izdevumu balansam. 
                    Iegaumēt galvā pilnīgi visus ienākumu un izdevumu avotus ir vērtīgi, bet ar šīs sistēmas palīdzību budžeta plānošanas process kļūs ievērojami vieglāks. 
                    To var panākt, kad pievienojat jaunus ierakstus par budžeta avotiem, naudas summām, kas tiek attēloti gan tabulas, gan diagrammas veidā. 
                    Programma fokusējas uz vienkāršību, kā arī ir bezmaksas.
                </p>
                <p class="text-lg mt-6 ml-8">
                    <b>Šajā programmā ir paredzētas dažādas iespējas:</b>
                </p>
                <ul class="list-disc text-lg ml-12">
                    <li>Budžeta avotu pievienošana, rediģēšana, dzēšana un apskatīšana</li>
                    <li>Filtrēšana pēc mēnešiem un kategorijām</li>
                    <li>Valūtas izvēle</li>
                    <li>CSV atskaišu nolasīšana</li>
                    <li>Budžeta balansa aprēķins starp ienākumu un izdevumu avotiem</li>
                    <li>Datu skaidrs attēlojums 2 veidos- gan tabulā, gan stabiņu diagrammas veidā.</li>
                    <li>Profila lapas iespējas- tumšā režīma pārslēdzējs, profila informācijas atjaunošana</li>
                </ul> 
            </div>
        </AuthenticatedLayout>
    );
}