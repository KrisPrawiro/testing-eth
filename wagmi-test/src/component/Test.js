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
    address: '0x7708D665C0403a2063B6bE0E31235A2ec802f1E7',
    abi: forkDome.abi,
    functionName: 'ownerOf',
    args: [3],
  })
  
  React.useEffect(() => {

  }, [])

  console.log(contract.data)
  return (
    <div style={{color: 'white', display: "flex"}}>
      
      
    </div>
  )
}
