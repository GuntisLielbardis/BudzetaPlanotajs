import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown';
import { useState, useEffect } from "react";
import axios from 'axios';
import { VscTrash } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";

export default function Dashboard() {
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem("currency") || "Valūta";
    });

    const addIncomeSource = async () => {
        const response = await axios.post('/income-sources', {
            currency: selectedCurrency,
            total_budget: document.getElementById('input_budget').value,
            description: document.getElementById('input_description').value,
            amount: document.getElementById('input_income_source').value,
        });
        console.log(response.data.message);
        fetchIncomeSources();
    };

    const fetchIncomeSources = async () => {
        const response = await axios.get('/income-sources');
        setIncomeSources(response.data);
    };
    
    useEffect(() => {
        localStorage.setItem("currency", selectedCurrency);
    }, [selectedCurrency]);

    const [incomeSources, setIncomeSources] = useState([]);
    useEffect(() => {
        axios.get('/income-sources').then((response) => {
            setIncomeSources(response.data);
        });
    }, []);

    const deleteIncomeSource = async (id) => {
        try {
            const response = await axios.delete(`/income-sources/${id}`);
            console.log(response.data.message);
            fetchIncomeSources();
        } catch (error) {
            console.error("Neizdevās izdzēst:", error);
        }
    };

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
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <InputError className="mt-2" message={() => { }} />
                            </div>

                            <div className="">
                                <div className="relative inline-block">
                                    <InputLabel htmlFor="currency_select" value="Valūta" />
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

                                        <Dropdown.Content className="absolute left-0 mt-4 w-36 bg-white border border-gray-30 shadow-lg rounded-md z-50">
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
                                    <InputLabel htmlFor="input_budget" value="Kopējais budžets" className="mt-5" />
                                    <TextInput id="input_budget" type="number" placeholder="Jūsu budžets" className="mt-2" required />
                                </div>

                                <div className="pt-5">
                                    <h2 className="text-lg font-bold">Ienākumu avoti</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <textarea id="input_description" placeholder="Raksturojums" className="h-10 w-1/4 resize-none overflow-hidden rounded-md px-3 py-2" rows="1"
                                                onInput={(e) => {
                                                    e.target.style.height = "40px";
                                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                                }}
                                            />

                                            <TextInput id="input_income_source" type="number" placeholder="Apjoms" className="h-10" required />
                                            <button onClick={addIncomeSource} className="flex items-center h-10 text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm gap-1 px-4 py-2"><VscAdd className="text-lg"/>Pievienot</button>
                                        </div>

                                        {incomeSources.length > 0 &&(
                                        <table className="table-auto bg-white">
                                            <thead>
                                                <tr>
                                                    <th className="border px-4 py-2">Apraksts</th>
                                                    <th className="border px-4 py-2">Summa</th>
                                                    <th className="border px-4 py-2">Valūta</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {incomeSources.map((source) => (
                                                    <tr key={source.id}>
                                                        <td className="border px-4 py-2">{source.description}</td>
                                                        <td className="border px-4 py-2">{source.amount}</td>
                                                        <td className="border px-4 py-2">{source.currency}</td>
                                                        <td>
                                                            <button 
                                                                onClick={() => deleteIncomeSource(source.id)} 
                                                                className="flex items-center gap-1 h-10 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2">
                                                                <VscTrash className="text-lg"/>
                                                                Dzēst
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}