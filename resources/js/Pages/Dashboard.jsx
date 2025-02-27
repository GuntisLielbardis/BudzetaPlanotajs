import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown';
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem("currency") || "Valūta";
    });

    useEffect(() => {
        localStorage.setItem("currency", selectedCurrency);
    }, [selectedCurrency]); 

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Informācijas panelis
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <InputError className="mt-2" message={()=>{}} />
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                Laipni lūdzam budžeta plānotāja Web aplikācijā!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative inline-block ms-32">
                <InputLabel htmlFor="currency_select" value="Valūta"/>
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md mt-2 border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                            >
                                {selectedCurrency}
                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content className="absolute left-0 mt-4 w-36 bg-white border border-gray-30 shadow-lg-rounded-md">
                        <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Eiro €")}>
                            Eiro €
                        </Dropdown.Link>
                        <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Dolāri $")}>
                            Dolāri $
                        </Dropdown.Link>
                        <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Mārciņas £")}>
                            Mārciņas £
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>

            <div>
                <InputLabel htmlFor="input_budget" value="Kopējais budžets" className="ml-32 mt-5"/>
                <TextInput id="input_budget" type="number" placeholder="Jūsu budžets" className="ml-32 mt-2" required/>
                <button class="h-10 text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2 ml-4">Iesniegt</button>
            </div>

            <div class="pt-5">
                <h2 class="text-lg font-bold ml-32">Ienākumu avoti</h2>
                <div class="space-y-2">
                    <div class="flex items-start gap-3">
                    <textarea id="input_description" placeholder="Raksturojums" className="h-10 ml-32 w-1/2 resize-none overflow-hidden rounded-md px-3 py-2" rows="1"
                        onInput={(e) => {
                            e.target.style.height = "40px";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />

                        <TextInput id="input_income_source" type="number" placeholder="Apjoms" className="h-10" required/>
                        <button class="h-10 text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-4 py-2">Pievienot</button>
                        <button class="h-10 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2">Dzēst</button>
                    </div>
                    
                    <div class="bg-gray-100 p-2 rounded ml-32">
                        Elements 1...Summa 1<br></br>
                        Elements 2...Summa 2
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}