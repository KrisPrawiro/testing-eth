import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MintNFT } from './MintNFT'
import { ShowNFT } from './ShowNFT'
import { Test } from './Test'
import { useState } from 'react'
import './Profile.css';

function Profile() {
  const { address, isConnected, connector } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain, chains } = useNetwork();

  // console.log(connector)

  if (isConnected)
    return (
      <div style={{color: "white", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', backgroundColor: '#222222', paddingBottom: 10}}>
          <div style={{width: 300}}>
            {chain && <div>Connected to {chain.name}</div>}
            {chains && (
              <div>Available chains: {chains.map((chain) => chain.name)}</div>
            )}
          </div>
          <a href={'https://goerli.etherscan.io/token/0x1c7d4305a4481bdd5832ecf7130a78f11fcf8925?a=' + address} className='link'>
            Account: {address}
          </a>
          <div style={{width: 300, display: 'flex', justifyContent: 'end'}}>
            <button style={{minWidth: 100, height: 40}} onClick={() => disconnect()}>Disconnect</button>
          </div>
        </div>
        <ShowNFT address={address}></ShowNFT>
        <Test address={address}></Test>
      </div>
    )
    return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile;