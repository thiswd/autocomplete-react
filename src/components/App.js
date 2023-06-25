import Form from "./Form";
import Header from "./Header";

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-light text-primary min-h-screen py-12">
        <Header />
        <Form />
      </div>
    </QueryClientProvider>
  );
}
