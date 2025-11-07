'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex-grow m-0 p-0 bg-gradient-to-br from-pink-800 to-violet-200">
                {children}
            </main>
        </QueryClientProvider>
    )
}
