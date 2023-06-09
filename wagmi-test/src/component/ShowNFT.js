import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi';
import forkDome from "../abi/ForkDome.json";
import './ShowNFT.css';
import { MintNFT } from './MintNFT';

export function ShowNFT(props) {
  const [tokens, setTokens] = React.useState([]);

  const [curPage, setCurPage] = React.useState(0);

  const [fetch, setFetch] = React.useState(true);

  const contract = useContractRead({
    address: '0x1c7d4305a4481bdd5832ecf7130a78f11fcf8925',
    abi: forkDome.abi,
    functionName: 'getTokenURIByOwner',
    args: [props.address, curPage],
    onSuccess: () => {
      let allTokens = [];
      if (!fetch) {
        return;
      }
      if (curPage != 0) {
        allTokens = tokens;
      }
      allTokens = allTokens.concat(contract.data);
      if (contract.data && contract.data[9] != "") {
        setCurPage(curPage + 1);
        // contract.refetch();
      } else {
        setCurPage(0);
        setFetch(false);
      }
      setTokens(allTokens);
      // console.log("data: ", contract.data)
      // console.log("alltokens: ", allTokens)
    }
  })
  

  React.useEffect(() => {
  
  }, [])

  return (
    <div>
      <div style={{fontSize: 30}}>
        Your NFT Gallery
      </div>
      <div>
        <button onClick={() => {setTokens([]); setFetch(true); contract.refetch();}}>Refresh NFT</button>
      </div>
      <div style={{color: 'white', display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
        {tokens && tokens.map((e, index) => {
          if (e != '') {
            return (
              <div key={index} className='card' style={{animationDelay: (index * 0.1) + 's'}}> 
                <img src={e} style={{width: 200, marginBottom: 5}}></img>
                <div style={{}}>
                  NFT {index + 1}
                </div>
              </div>
            )
          }
        })}
        {tokens.length > 0 && 
          <div className='card' style={{ animationDelay: (tokens.length * 0.1) + 's'}}> 
            <div style={{width: 200, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <MintNFT address={props.address}></MintNFT>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
