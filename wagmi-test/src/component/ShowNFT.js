import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi';
import forkDome from "../abi/ForkDome.json"

export function ShowNFT(props) {
  const [tokens, setTokens] = React.useState([]);

  const contract = useContractRead({
    address: '0x7708d665c0403a2063b6be0e31235a2ec802f1e7',
    abi: forkDome.abi,
    functionName: 'getTokenURIByOwner',
    args: [props.address, 0],
  })
  
  React.useEffect(() => {
    setTokens(contract.data);
  }, [])

  console.log(contract.data)
  return (
    <div style={{color: 'white', display: "flex"}}>
      {contract.data && contract.data.map((e, index) => {
        if (e != '') {
          return (
            <div key={index} style={{display: 'flex', flexDirection: 'column', padding: 5}}> 
              <img src={e} style={{width: 200}}></img>
              NFT {index + 1}
            </div>
          )
        }
      })}
      
    </div>
  )
}
