import logo from './logo.svg';
import './App.css';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {goerli} from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import Profile from "./component/Profile"
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function App() {
  const { chains, publicClient } = configureChains(
    [goerli],
    [
      alchemyProvider({ apiKey: "eE1UIgdRNSTzZw90QhM4SMFp9M0eDXBL" }),
      publicProvider()
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });

  const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient
    // publicClient: createPublicClient({
    //   chain: goerli,
    //   transport: http()
    // }),
  })

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <div className="App" style={{backgroundColor: "black", minHeight: "100vh"}}>
          <Profile></Profile>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
