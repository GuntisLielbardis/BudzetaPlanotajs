import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`bg-white dark:bg-gray-800 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    Profila informācija
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Atjauniniet sava konta profila informāciju un e-pasta adresi.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Vārds" className="dark:text-gray-200"/>
                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="E-pasts" className="dark:text-gray-200"/>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Jūsu e-pasta adrese nav verificēta.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Spiediet šeit, lai pārsūtītu e-pastu verifikācijai.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Jauna verifikācijas saite tika nosūtīta uz Jūsu e-pastu.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Saglabāt</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Izmaiņas saglabātas.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}