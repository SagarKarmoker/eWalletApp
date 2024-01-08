import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Card, CardHeader, CardBody, CardFooter, Button,
    useToast
} from '@chakra-ui/react'
import { useContract, useContractRead, useAddress, useBalanceForAddress, useSDK } from '@thirdweb-dev/react';
import { ACCOUNT_FACTORY_ADDR } from '../constants/constants'

export default function Fund() {
    const toast = useToast();
    const sdk = useSDK();
    const address = useAddress();
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState(0);

    const { contract: accountFactory } = useContract(ACCOUNT_FACTORY_ADDR);
    const { data: usernameOfAccount } = useContractRead(accountFactory, "usernameOfAccount", [address]);
    const { data: tokenBalance } = useBalanceForAddress(address);

    const sendFund = async () => {
        if (!username || amount === 0) {
            toast({
                title: 'Enter Username and amount',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
        if (amount > Number(tokenBalance?.displayValue)) {
            toast({
                title: 'Insufficient funds',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
            return;
        }

        try {
            const receiverWalletAddress = await accountFactory?.call(
                "accountOfUsername",
                [username]
            );

            if (receiverWalletAddress === "0x0000000000000000000000000000000000000000") {
                alert("Username does not exist");
                return;
            }

            await sdk?.wallet.transfer(receiverWalletAddress, amount);

            toast({
                title: 'Fund send to ' + { username },
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
            setUsername("");
            setAmount(0);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='flex justify-center items-center pt-8'>
            <Card className='w-[350px] pt-5'>
                <h1 className='text-center font-bold text-xl'>Welcome, {usernameOfAccount}</h1>
                <CardHeader>
                    <h1 className='font-bold text-xl'>Send Fund</h1>
                    <p>
                        🎉Transfer fund to your friends and family for free.
                    </p>
                    <h1 className='font-bold text-xl'>Available Balance: {tokenBalance?.displayValue} sETH</h1>
                </CardHeader>
                <CardBody>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder='Username'
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Amount</FormLabel>
                        <Input placeholder='0.001' type='number'
                            onChange={(e) => { setAmount(e.target.value) }} />
                    </FormControl>
                </CardBody>
                <CardFooter className='justify-end'>
                    <Button colorScheme='blue' onClick={sendFund}>Send</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
