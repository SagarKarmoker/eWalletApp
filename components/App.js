import React from 'react'
import Navbar from './Navbar'
import { SmartWallet, useAddress, useWallet, useConnectionStatus } from '@thirdweb-dev/react'

function App() {
    const address = useAddress();
    const wallet = useWallet();

    return (
        <>
            {address ? (
                wallet instanceof SmartWallet ? (
                    <Navbar isConnected={"connected"} />
                ) : (
                    <>
                        <Navbar isConnected={"connecting"} />
                    </>
                )
            ) : (
                <Navbar isConnected={"disconnected"} />
            )}
        </>
    )
}

export default App