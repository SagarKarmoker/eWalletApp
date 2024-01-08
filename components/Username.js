import {
    FormControl,
    FormLabel,
    Input,
    Card, CardHeader, CardBody, CardFooter, Button,
    useToast
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { ACCOUNT_FACTORY_ADDR } from '../constants/constants'
import { useContract, useContractRead, useAddress, useBalanceForAddress, useSDK } from '@thirdweb-dev/react';
import Fund from './Fund';

export default function Username() {
    const toast = useToast();
    const address = useAddress();
    const [username, setUsername] = useState('');
    const sdk = useSDK();

    const regName = async () => {
        if (!username) {
            toast({
                title: 'Account created Error.',
                description: "Please Enter username",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        try {
            const usernameAccount = await accountFactory?.call(
                "accountOfUsername",
                [username]
            );
            if (usernameAccount === "0x0000000000000000000000000000000000000000") {
                const accountContract = await sdk?.getContract(address);
                await accountContract?.call(
                    "register",
                    [username]
                );
                toast({
                    title: 'Account created.',
                    description: "Your username was registered successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Account created warning.',
                    description: "Username already taken",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    const { contract: accountFactory } = useContract(ACCOUNT_FACTORY_ADDR);
    const { data: hasUsername } = useContractRead(accountFactory, "hasUsername", [address]);
    

    useEffect(() => {

    },[hasUsername])

    return (
        <div className='flex justify-center items-center pt-8'>
            {hasUsername ? (
                <Fund />
            ) : (
                <Card className='w-[350px]'>
                    <CardHeader>
                        <h1 className='font-bold text-xl'>Activate your username</h1>
                        <p>
                            In order to use our decentralized cash app, you need to activate your username.
                        </p>
                    </CardHeader>
                    <CardBody>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username'
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </FormControl>
                    </CardBody>
                    <CardFooter className='justify-end'>
                        <Button colorScheme='blue' onClick={regName}>Check & Register</Button>
                    </CardFooter>
                </Card>
            )}
        </div>

    )
}