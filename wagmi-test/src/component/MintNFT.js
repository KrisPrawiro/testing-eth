import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import images from '../images/images.json';
import forkDome from "../abi/ForkDome.json";


export function MintNFT(props) {
  const [tokenURI, setTokenURI] = React.useState('');
  const [mint, setMint] = React.useState(false);
  
  const { config , error} = usePrepareContractWrite({
    address: '0x1c7d4305a4481bdd5832ecf7130a78f11fcf8925',
    abi: forkDome.abi,
    functionName: 'mint',
    args: [props.address, tokenURI]
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  React.useEffect(() => {
    console.log(isLoading)
    console.log(write)
    console.log(data)
    console.log(config)
    console.log(props.address);
    console.log(error);
    console.log({
      address: '0x1c7d4305a4481bdd5832ecf7130a78f11fcf8925',
      abi: forkDome.abi,
      functionName: 'mint',
      args: [props.address, tokenURI]
    })
    if (mint && write) {
      setTimeout(() => {write()}, 1000);
      setMint(false);
    }
  }, [tokenURI])

  return (
    <div>
      <button disabled={isLoading} 
        onClick={() => {
          let random = Math.floor(Math.random() * images.length);
          setTokenURI(images[random]); 
          setMint(true);
        }}
        style={{padding: '5px 10px', }}
      >
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  )
}
