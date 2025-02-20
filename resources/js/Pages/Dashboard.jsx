import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to this dashboard!
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-t">
                <label for="currency" class="block text-sm font-medium ml-32">Valūta</label>
                <select id="currency" class="border border-gray-500 text-black p-2 w-1/12 ml-32 mt-2">
                    <option value="EUR">Eiro €</option>
                    <option value="USD">Dolāri $</option>
                    <option value="GBP">Mārciņas £</option>
                </select>
            </div>

            <div>
                <label for="input_budget" class="block text-sm font-medium ml-32 mt-5">Kopējais budžets</label>
                <input type="number" id="input_budget" class="border border-black-800 block w-1/7 p-2 ml-32 mt-2" placeholder="Jūsu budžets" required />
                <button class="bg-gray-300 hover:bg-green-400 mt-3 ml-32">Iesniegt</button>
            </div>

            <div class="border-t pt-4">
                <h2 class="text-lg font-bold ml-32">Ienākumu avoti</h2>
                <div class="space-y-2">
                    <div class="flex gap-2">
                        <input type="text" class="border border-gray-500 p-2 w-1/2 ml-32" placeholder="Raksturojums" />
                        <input type="number" class="border border-gray-500 p-2" placeholder="Apjoms" />
                        <button class="bg-blue-400 hover:bg-blue-500 text-white px-4 rounded">Pievienot</button>
                        <button class="bg-red-500 hover:text-red-700 px-4 rounded">Dzēst</button>
                    </div>
                    
                    <div class="bg-gray-100 p-2 rounded">
                        <table class="table-auto bg-white ml-32">
                            <tbody>
                                <tr>
                                    <td class="border border-gray-500 px-4">Alga</td>
                                    <td class="border border-gray-500 px-4">x€</td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-500 px-4">Dāvana</td>
                                    <td class="border border-gray-500 px-4">y€</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
