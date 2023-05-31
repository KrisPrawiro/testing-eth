import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi';
import forkDome from "../abi/ForkDome.json"

export function Test(props) {

  const contract = useContractRead({
    address: '0x1c7d4305a4481bdd5832ecf7130a78f11fcf8925',
    abi: forkDome.abi,
    functionName: 'ownerOf',
    args: [0],
  })
  
  React.useEffect(() => {

  }, [])

  // console.log(contract.data == props.address)
  return (
    <div style={{color: 'white', display: "flex"}}>
      
    </div>
  )
}
