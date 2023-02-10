import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { graphqlClient } from './graphql/graphqlClient';
import { useLoginUserMutation } from './graphql/__generated__/graphql';


const Login = () => {
    const [error, setError] = useState<string | null>(null);

    const { mutate } = useLoginUserMutation(graphqlClient);

    const onSubmit = (event: any) => {
        event.preventDefault();

        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;

        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    // navigate('/dashboard/orders');
                    console.log(data);
                },
                onError: (error) => {
                    console.error(error);
                    setError('Something went wrong with logging in');
                },
            }
        );
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-100">
            <div className="w-[300px] space-y-4  bg-white p-5">
                <h1 className="text-xl font-bold">Login</h1>
                <form onSubmit={onSubmit} className="flex flex-col space-y-4 text-lg">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <button type="submit" className="w-fit  bg-black p-2 px-4 text-white">
                        Login
                    </button>
                </form>
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
}

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <Login />
    </QueryClientProvider>
);

export default App;
