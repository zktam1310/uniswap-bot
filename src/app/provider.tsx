"use client"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [mainnet],
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 4,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className='max-w-[1480px] mx-auto p-3'>
            {children}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
