import logo from './logo.svg';
import './App.css';
import { WagmiConfig, createConfig, mainnet} from 'wagmi'
import {goerli} from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import Profile from "./component/Profile"

function App() {
  const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: goerli,
      transport: http()
    }),
  })

  return (
    <WagmiConfig config={config}>
      <div className="App" style={{backgroundColor: "black", minHeight: "100vh"}}>
        <Profile></Profile>
      </div>
    </WagmiConfig>
  );
}

export default App;
