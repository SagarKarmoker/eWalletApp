import React from 'react'
import Navbar from './Navbar'
import { SmartWallet, useAddress, useWallet, useConnectionStatus } from '@thirdweb-dev/react'
import Username from './Username';

function App() {
    const address = useAddress();
    const wallet = useWallet();

    return (
        <main>
            {address ? (
                wallet instanceof SmartWallet ? (
                    <>
                        <Navbar isConnected={"connected"} />
                        <Username />
                    </>
                ) : (
                    <>
                        <Navbar isConnected={"connecting"} />
                    </>
                )
            ) : (
                <Navbar isConnected={"disconnected"} />
            )}
        </main>
    )
}

export default App