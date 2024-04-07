import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { connectWallet, getAddressfun } from '../../services/blockchain';

const ConnectBtn = () => {
  const [address, setaddress] = useState('');
  console.log('🚀 ~ ConnectBtn ~ address:', address);

  useEffect(() => {
    async function fetch() {
      const addres = await getAddressfun();
      setaddress(addres);
    }
    fetch();
  }, []);

  const connectWallets = async () => {
    console.log('wallet');
    const addres = await connectWallet();
    setaddress(addres);
  };

  return (
    <div>
      {address ? (
        <button
          className=" space-x-2 flex user-card_btn px-3 py-2 text-body-bold"
          onClick={connectWallets}
        >
          connected
        </button>
      ) : (
        <button
          className=" user-card_btn px-3 py-2 text-body-bold"
          onClick={connectWallets}
        >
          connect wallet
        </button>
      )}
    </div>
  );
};

export default ConnectBtn;

// import { ConnectButton } from '@rainbow-me/rainbowkit'
// import Image from 'next/image'
// import React from 'react'

// const ConnectBtn = () => {
//   return (
//     <ConnectButton.Custom>
//       {({
//         account,
//         chain,
//         openAccountModal,
//         openChainModal,
//         openConnectModal,
//         authenticationStatus,
//         mounted,
//       }) => {
//         const ready = mounted && authenticationStatus !== 'loading'
//         const connected =
//           ready &&
//           account &&
//           chain &&
//           (!authenticationStatus || authenticationStatus === 'authenticated')

//         return (
//           <div
//             {...(!ready && {
//               'aria-hidden': true,
//               style: {
//                 opacity: 0,
//                 pointerEvents: 'none',
//                 userSelect: 'none',
//               },
//             })}
//           >
//             {(() => {
//               if (!connected) {
//                 return (
//                   <button
//                     className="bg-transparent border border-gray-300 hover:bg-red-600
//                         py-2 px-6 text-black hover:text-white rounded-full
//                         transition duration-300 ease-in-out"
//                     onClick={openConnectModal}
//                     type="button"
//                   >
//                     Connect Wallet
//                   </button>
//                 )
//               }

//               if (chain.unsupported) {
//                 return (
//                   <button
//                     className="bg-transparent border border-gray-300 hover:bg-red-600
//                         py-2 px-6 text-black hover:text-white rounded-full
//                         transition duration-300 ease-in-out"
//                     onClick={openChainModal}
//                     type="button"
//                   >
//                     Wrong network
//                   </button>
//                 )
//               }

//               return (
//                 <div style={{ display: 'flex', gap: 12 }}>
//                   <button
//                     onClick={openChainModal}
//                     style={{ display: 'flex', alignItems: 'center' }}
//                     className="bg-transparent border border-gray-300 hover:bg-red-600
//                     py-2 px-6 text-black hover:text-white rounded-full
//                     transition duration-300 ease-in-out"
//                     type="button"
//                   >
//                     {chain.hasIcon && (
//                       <div
//                         style={{
//                           background: chain.iconBackground,
//                           width: 12,
//                           height: 12,
//                           borderRadius: 999,
//                           overflow: 'hidden',
//                           marginRight: 4,
//                         }}
//                       >
//                         {chain.iconUrl && (
//                           <Image
//                             alt={chain.name ?? 'Chain icon'}
//                             src={chain.iconUrl}
//                             width="12"
//                             height="12"
//                           />
//                         )}
//                       </div>
//                     )}
//                     {chain.name}
//                   </button>

//                   <button
//                     className="bg-transparent border border-gray-300 hover:bg-red-600
//                     py-2 px-6 text-black hover:text-white rounded-full
//                     transition duration-300 ease-in-out"
//                     onClick={openAccountModal}
//                     type="button"
//                   >
//                     {/* {account.displayName} */}
//                     {/* {account.displayBalance
//                       ? ` (${account.displayBalance})`
//                       : ''} */}
//                   </button>
//                 </div>
//               )
//             })()}
//           </div>
//         )
//       }}
//     </ConnectButton.Custom>
//   )
// }

// export default ConnectBtn
