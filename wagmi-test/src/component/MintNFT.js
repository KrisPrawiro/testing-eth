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
  
  const { config } = usePrepareContractWrite({
    address: '0x7708d665c0403a2063b6be0e31235a2ec802f1e7',
    abi: forkDome.abi,
    functionName: 'mint',
    args: [props.address, tokenURI]
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  React.useEffect(() => {
    console.log(tokenURI)
  }, [tokenURI])

  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => {
        let random = Math.floor(Math.random() * images.length);
        setTokenURI(images[random]); 
        // console.log(tokenURI);
        write()
      }}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  )
}
