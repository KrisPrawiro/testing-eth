import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MintNFT } from './MintNFT'
import { ShowNFT } from './ShowNFT'
import { Test } from './Test'
import { useState } from 'react'

function Profile() {
  const { address, isConnected, connector } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain, chains } = useNetwork()

  const {onMint, setOnMint} = useState(() => {});

  console.log(connector)

  if (isConnected)
    return (
      <div style={{color: "white", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
        <>
          {chain && <div>Connected to {chain.name}</div>}
          {chains && (
            <div>Available chains: {chains.map((chain) => chain.name)}</div>
          )}
        </>
        Account: {address}
        <button style={{minWidth: 100}} onClick={() => disconnect()}>Disconnect</button>
        <ShowNFT address={address} update={setOnMint}></ShowNFT>
        <MintNFT address={address} refresh={onMint}></MintNFT>
        <Test address={address}></Test>
      </div>
    )
    return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile;