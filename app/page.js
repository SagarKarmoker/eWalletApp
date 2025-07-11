"use client";
import App from '@/components/App'
import { ChakraProvider } from '@chakra-ui/react'
import { ThirdwebProvider, embeddedWallet, smartWallet } from '@thirdweb-dev/react'
import { Sepolia } from '@thirdweb-dev/chains';

const customChain = {
  chainId: 11155111,
  rpc: ["https://sepolia.infura.io/v3/617a4f657e544795a8bf777ca806f798"],
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia ETH",
    symbol: "sETH",
  },
  shortName: "Sepolia ETH",
  slug: "Sepolia",
  testnet: true,
  chain: "Sepolia",
  name: "Sepolia Testnet",
}

const smartWalletConfig = {
  factoryAddress: "0x07fa5fFA978247D38adaF55ac1BdaF9D6c81A330",
  gasless: true,
}

export default function Home() {
  return (
    <ThirdwebProvider activeChain={Sepolia} clientId="98a7c778fd35fb7e601259268e78aff8"
    supportedWallets={[
      smartWallet(embeddedWallet(), smartWalletConfig),
    ]}
    >
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}
