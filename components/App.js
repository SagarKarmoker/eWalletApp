import React from 'react'
import Navbar from './Navbar'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { SmartWallet, useAddress, useWallet } from '@thirdweb-dev/react'

function App() {
    const address = useAddress();
    const wallet = useWallet();

    return (
        <>
            <Navbar />
            {address ? (
                wallet instanceof SmartWallet ? (
                    <p>{address}</p>
                ) : (
                    <>
                        <p>Connecting...</p>
                    </>
                )
            ) : (
                <p>please signup</p>
            )}
        </>
    )
}

export default App