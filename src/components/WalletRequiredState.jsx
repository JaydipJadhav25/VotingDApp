const WalletRequiredState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
      {/* Icon Placeholder - You can use Lucide-React or Heroicons here */}
      <div className="mb-4 p-4 bg-blue-100 rounded-full text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0[...]" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Blockchain Connection Required
      </h2>
      
      <p className="max-w-md text-gray-600 mb-6 leading-relaxed">
        To interact with our smart contract features, please <strong>connect your wallet</strong>. This allows us to securely verify your identity on the network.
      </p>

      <button 
        onClick={() => window.location.reload()} // Or trigger your connect function
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm active:scale-95"
      >
        Connect Wallet
      </button>
      
      <p className="mt-4 text-xs text-gray-400">
        Compatible with MetaMask, Coinbase Wallet, and WalletConnect.
      </p>
    </div>
  );
};


export default WalletRequiredState;