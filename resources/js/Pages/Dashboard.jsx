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
import { VscEdit } from "react-icons/vsc";
import ConfirmDelete from "@/components/ConfirmDelete";
import Pagination from "@/Components/Pagination";
import { formatInTimeZone } from 'date-fns-tz';

export default function Dashboard() {
    const [incomeSource, setIncomeSource] = useState();
    const [totalSum, getTotalSum] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem("currency") || "Valūta";
    });
    const [description, setDescription] = useState("");
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedIncome, setEditedIncome] = useState({});

    const addIncomeSource = async () => {
        await axios.post('/income-sources', {
            currency: selectedCurrency,
            description: description,
            amount: incomeSource,
        });
        
        fetchIncomeSources();
        setDescription(""); 
        setIncomeSource("");
    }; 

    const fetchIncomeSources = async () => {
        const response = await axios.get('/income-sources');
        setIncomeSources(response.data.incomeSources ||[]);
        getTotalSum(response.data.sum);
    };
    
    useEffect(() => {
        localStorage.setItem("currency", selectedCurrency);
    }, [selectedCurrency]);

    useEffect(() => {
        fetchIncomeSources();
        fetchExpenseSources();
    }, []);
    
    const [incomeSources, setIncomeSources] = useState([]);
    

    const startEditing = (source) => {
        setEditingRowId(source.id);
        setEditedIncome({ 
            description: source.description, 
            amount: source.amount,
            currency: source.currency
        });
    };
    
    const saveEdit = async (id) => {
        try {
            const originalSource = incomeSources.find(source => source.id === id);
            const payload = {
                description: editedIncome.description ?? originalSource.description,
                amount: editedIncome.amount ?? originalSource.amount,
                currency: editedIncome.currency ?? originalSource.currency
            };
            await axios.put(`/income-sources/${id}`, payload);
            fetchIncomeSources();
            setEditingRowId(null);
        } 
        catch (error) {
            console.error("Neizdevās saglabāt:", error);
        }
    };
      
    const deleteIncomeSource = async (id) => {
        try {
            await axios.delete(`/income-sources/${id}`);
            fetchIncomeSources();
        } catch (error) {
            console.error("Neizdevās izdzēst:", error);
        }
    };
    
    const [expenseSource, setExpenseSource] = useState();
    const [totalSum2, getTotalSum2] = useState(0);
    const [description2, setDescription2] = useState("");
    const [editingRowId2, setEditingRowId2] = useState(null);
    const [editedExpense, setEditedExpense] = useState({});

    const addExpenseSource = async () => {
        await axios.post('/expense-sources', {
            currency: selectedCurrency,
            description: description2,
            amount: expenseSource,
        });
        fetchExpenseSources();
        setDescription2(""); 
        setExpenseSource("");
    }; 

    const fetchExpenseSources = async () => {
        const response2 = await axios.get('/expense-sources');
        setExpenseSources(response2.data.expenseSources ||[]);
        getTotalSum2(response2.data.sum);
    };

    const [expenseSources, setExpenseSources] = useState([]);
    

    const startEditing2 = (source) => {
        setEditingRowId2(source.id);
        setEditedExpense({ 
            description: source.description, 
            amount: source.amount,
            currency: source.currency
        });
    };
    
    const saveEdit2 = async (id) => {
        try {
            const originalSource2 = expenseSources.find(source => source.id === id);
            const payload2 = {
                description: editedExpense.description ?? originalSource2.description,
                amount: editedExpense.amount ?? originalSource2.amount,
                currency: editedExpense.currency ?? originalSource2.currency
            };
            await axios.put(`/expense-sources/${id}`, payload2);
            fetchExpenseSources();
            setEditingRowId2(null);
        } 
        catch (error) {
            console.error("Neizdevās saglabāt:", error);
        }
    };
      
    const deleteExpenseSource = async (id) => {
        try {
            await axios.delete(`/expense-sources/${id}`);
            fetchExpenseSources();
        } catch (error) {
            console.error("Neizdevās izdzēst:", error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedType, setSelectedType] = useState("");

    const openModal = (id, type) => {
        setSelectedId(id);
        setSelectedType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedId(null);
    };

    const confirmDelete = () => {
        if (selectedId) {
            if (selectedType=="income")
                deleteIncomeSource(selectedId);
            else if (selectedType=="expense")
                deleteExpenseSource(selectedId);
        }
        closeModal();
    };

    const [currentPageIncome, setCurrentPageIncome] = useState(0);
    const [currentPageExpense, setCurrentPageExpense] = useState(0);
    const itemsPerPage = 5;
    const offsetIncome = currentPageIncome * itemsPerPage;
    const offsetExpense = currentPageExpense * itemsPerPage;
    const currentItems = incomeSources.slice(offsetIncome, offsetIncome + itemsPerPage);
    const currentItems2 = expenseSources.slice(offsetExpense, offsetExpense + itemsPerPage);
    const pageCount = Math.ceil(incomeSources.length / itemsPerPage);
    const pageCount2 = Math.ceil(expenseSources.length / itemsPerPage);

    const handlePageChangeIncome = ({ selected }) => {
        setCurrentPageIncome(selected);
    };
    const handlePageChangeExpense = ({ selected }) => {
        setCurrentPageExpense(selected);
    };
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-gray-200">
                    Informācijas panelis
                </h2>
            }
            headerClassName="dark:bg-gray-800"
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-200 dark:bg-gray-800 p-6 rounded-md shadow">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="bg-white dark:bg-gray-700 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <InputError className="mt-2" message={() => { }} />
                            </div>

                            <div>
                                <div className="relative inline-block">
                                    <InputLabel htmlFor="currency_select" value="Valūta" className="text-gray-900 dark:text-gray-200" />
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md mt-2 border border-transparent bg-white dark:bg-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
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

                                        <Dropdown.Content className="absolute left-0 mt-4 w-36 bg-white dark:bg-gray-900 dark:text-gray-400 rounded-md z-50">
                                            <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Eiro €")} className="block w-full px-4 py-2 bg-white dark:bg-gray-600 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                Eiro €
                                            </Dropdown.Link>
                                            <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Dolāri $")} className="block w-full px-4 py-2 bg-white dark:bg-gray-600 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                Dolāri $
                                            </Dropdown.Link>
                                            <Dropdown.Link as="button" onClick={() => setSelectedCurrency("Mārciņas £")} className="block w-full px-4 py-2 bg-white dark:bg-gray-600 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                Mārciņas £
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                
                                <div className="pt-5">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">Ienākumu avoti</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <textarea id="input_description" placeholder="Raksturojums" className="h-10 w-1/4 resize-none overflow-hidden rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" value={description} onChange={(e) => setDescription(e.target.value)} rows="1"
                                                onInput={(e) => {
                                                    e.target.style.height = "40px";
                                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                                }}
                                            />

                                            <TextInput id="input_income_source" type="number" placeholder="Apjoms" className="h-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} required />
                                            <button onClick={addIncomeSource} className="flex items-center h-10 text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm gap-1 px-4 py-2"><VscAdd className="text-lg"/>Pievienot</button>
                                        </div>

                                        {incomeSources?.length > 0 &&(
                                        <div>
                                            <table className="table-auto bg-white dark:bg-gray-800 dark:text-gray-400">
                                                <thead>
                                                    <tr className="dark:text-gray-300">
                                                        <th className="border px-4 py-2">Apraksts</th>
                                                        <th className="border px-4 py-2">Summa</th>
                                                        <th className="border px-4 py-2">Valūta</th>
                                                        <th className="border px-4 py-2">Datums</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((source) => (
                                                        <tr key={source.id} className="bg-white dark:bg-gray-600">
                                                            <td className="border px-4 py-2">
                                                                {editingRowId === source.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedIncome.description ?? ""}
                                                                        onChange={(e) => setEditedIncome((prev) => ({ ...prev, description: e.target.value }))}
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    />
                                                                ) : (
                                                                    source.description
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId === source.id ? (
                                                                    <input
                                                                        type="number"
                                                                        value={editedIncome.amount ?? ""}
                                                                        onChange={(e) => setEditedIncome((prev) => ({ ...prev, amount: e.target.value }))}
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    />
                                                                ) : (
                                                                    source.amount.toFixed(2)
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId === source.id ? (
                                                                    <select
                                                                        value={editedIncome.currency !== undefined ? editedIncome.currency : source.currency}
                                                                        onChange={(e) =>
                                                                            setEditedIncome((prev) => ({ ...prev, currency: e.target.value }))
                                                                        }
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    >
                                                                        <option value="Eiro €">Eiro €</option>
                                                                        <option value="Dolāri $">Dolāri $</option>
                                                                        <option value="Mārciņas £">Mārciņas £</option>
                                                                    </select>
                                                                ) : (
                                                                    source.currency
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {formatInTimeZone(new Date(source.updated_at), 'Europe/Riga', 'yyyy-MM-dd HH:mm:ss')}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId === source.id ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => saveEdit(source.id)}
                                                                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                                                                        >
                                                                            Saglabāt
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setEditingRowId(null)}
                                                                            className="ml-2 text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded"
                                                                        >
                                                                            Atcelt
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => startEditing(source)}
                                                                            className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                                                                        >
                                                                            <VscEdit className="text-lg" /> Rediģēt
                                                                        </button>

                                                                        <button
                                                                            onClick={() => openModal(source.id, "income")}
                                                                            className="flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2"
                                                                        >
                                                                            <VscTrash className="text-lg" /> Dzēst
                                                                        </button>

                                                                        <ConfirmDelete
                                                                            isOpen={isModalOpen}
                                                                            onClose={closeModal}
                                                                            onConfirm={confirmDelete}
                                                                            message="Vai tiešām vēlaties izdzēst?"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <p className="font-bold text-gray-900 dark:text-gray-200 mt-2">Kopā: {totalSum.toFixed(2)}</p>
                                            <Pagination pageCount={pageCount} onPageChange={handlePageChangeIncome} />
                                        </div>
                                        )}
                                    </div>
                                </div>
                                


                                <div className="pt-5">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">Izdevumu avoti</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <textarea id="input_description2" placeholder="Raksturojums" className="h-10 w-1/4 resize-none overflow-hidden rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" value={description2} onChange={(e) => setDescription2(e.target.value)} rows="1"
                                                onInput={(e) => {
                                                    e.target.style.height = "40px";
                                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                                }}
                                            />

                                            <TextInput id="input_expense_source" type="number" placeholder="Apjoms" className="h-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" value={expenseSource} onChange={(e) => setExpenseSource(e.target.value)} required />
                                            <button onClick={addExpenseSource} className="flex items-center h-10 text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm gap-1 px-4 py-2"><VscAdd className="text-lg"/>Pievienot</button>
                                        </div>

                                        {expenseSources?.length > 0 &&(
                                        <div>
                                            <table className="table-auto bg-white dark:bg-gray-800 dark:text-gray-400">
                                                <thead>
                                                    <tr className="dark:text-gray-300">
                                                        <th className="border px-4 py-2">Apraksts</th>
                                                        <th className="border px-4 py-2">Summa</th>
                                                        <th className="border px-4 py-2">Valūta</th>
                                                        <th className="border px-4 py-2">Datums</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems2.map((source) => (
                                                        <tr key={source.id} className="bg-white dark:bg-gray-600">
                                                            <td className="border px-4 py-2">
                                                                {editingRowId2 === source.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedExpense.description ?? ""}
                                                                        onChange={(e) => setEditedExpense((prev) => ({ ...prev, description: e.target.value }))}
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    />
                                                                ) : (
                                                                    source.description
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId2 === source.id ? (
                                                                    <input
                                                                        type="number"
                                                                        value={editedExpense.amount ?? ""}
                                                                        onChange={(e) => setEditedExpense((prev) => ({ ...prev, amount: e.target.value }))}
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    />
                                                                ) : (
                                                                    source.amount.toFixed(2)
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId2 === source.id ? (
                                                                    <select
                                                                        value={editedExpense.currency !== undefined ? editedExpense.currency : source.currency}
                                                                        onChange={(e) =>
                                                                            setEditedExpense((prev) => ({ ...prev, currency: e.target.value }))
                                                                        }
                                                                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
                                                                    >
                                                                        <option value="Eiro €">Eiro €</option>
                                                                        <option value="Dolāri $">Dolāri $</option>
                                                                        <option value="Mārciņas £">Mārciņas £</option>
                                                                    </select>
                                                                ) : (
                                                                    source.currency
                                                                )}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {formatInTimeZone(new Date(source.updated_at), 'Europe/Riga', 'yyyy-MM-dd HH:mm:ss')}
                                                            </td>

                                                            <td className="border px-4 py-2">
                                                                {editingRowId2 === source.id ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => saveEdit2(source.id)}
                                                                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                                                                        >
                                                                            Saglabāt
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setEditingRowId2(null)}
                                                                            className="ml-2 text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded"
                                                                        >
                                                                            Atcelt
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => startEditing2(source)}
                                                                            className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                                                                        >
                                                                            <VscEdit className="text-lg" /> Rediģēt
                                                                        </button>

                                                                        <button
                                                                            onClick={() => openModal(source.id, "expense")}
                                                                            className="flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2"
                                                                        >
                                                                            <VscTrash className="text-lg" /> Dzēst
                                                                        </button>

                                                                        <ConfirmDelete
                                                                            isOpen={isModalOpen}
                                                                            onClose={closeModal}
                                                                            onConfirm={confirmDelete}
                                                                            message="Vai tiešām vēlaties izdzēst?"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <p className="font-bold text-gray-900 dark:text-gray-200 mt-2">Kopā: {totalSum2.toFixed(2)}</p>
                                            <Pagination pageCount={pageCount2} onPageChange={handlePageChangeExpense} />
                                        </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="mt-5">
                                    <b className="text-gray-900 dark:text-gray-200">Balanss: {(totalSum-totalSum2).toFixed(2)}</b>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}