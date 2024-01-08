'use client'
import {
    Button, ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';
import { embeddedWallet, smartWallet, useConnect, useEmbeddedWallet, useAddress, useDisconnect } from '@thirdweb-dev/react'

function Navbar(props) {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { connect, sendVerificationEmail } = useEmbeddedWallet();
    const connectSmartWallet = useConnect();
    const address = useAddress();
    const disconnect = useDisconnect();

    const smartWalletConfig = smartWallet(embeddedWallet(), {
        factoryAddress: "0x07fa5fFA978247D38adaF55ac1BdaF9D6c81A330",
        gasless: true,
    });

    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    const handleRightBtn = async () => {
        try {
            await sendVerificationEmail({ email });
            setIsOtpSent(true);
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    };

    const handleVerify = async () => {
        try {
            if (!email || !otp) {
                alert("Please enter a verification code");
                return;
            }

            const verificationCode = otp;
            const personalWallet = await connect({
                strategy: "email_verification",
                email,
                verificationCode
            });

            console.log(personalWallet)

            const smartWallet = await connectSmartWallet(
                smartWalletConfig,
                {
                    personalWallet: personalWallet,
                    chainId: 11155111,
                }
            )

            onClose();
            const isDeployed = await smartWallet.isDeployed();
            if (!isDeployed) {
                await smartWallet.deploy();
            }

        } catch (err) {
            console.error('Error connecting or verifying:', err);
        }
    };

    useEffect(() => {
        console.log(address)
        console.log(props.isConnected)
    }, [address]);

    return (
        <nav className='flex justify-between p-4'>
            <div className='text-center font-bold text-2xl'>
                eWallet (Decentralized Cash App)
            </div>

            {
                props.isConnected === "connected" ? (
                    <div className='flex gap-x-4'>
                        {/* <Button colorScheme='blue'>
                            {address.slice(0, 10) + "..." + address.slice(25, 32)}
                        </Button> */}
                        <Menu>
                            <MenuButton as={Button} rightIcon={">>"}
                                colorScheme='blue'>
                                {address.slice(0, 10) + "..." + address.slice(25, 32)}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={async () => {
                                    await disconnect();
                                }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                ) : props.isConnected === "connecting" ? (
                    <Button colorScheme='blue'>Connecting</Button>
                ) : (
                    <div className='flex gap-x-4'>
                        <Button colorScheme='blue' onClick={onOpen}>
                            Sign Up/Login
                        </Button>
                    </div>
                )
            }

            {/* signup modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Get your decentralized wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input type='email' placeholder='alice@example.com'
                                isDisabled={isOtpSent ? true : false}
                                isRequired={true}
                                onChange={(e) => { setEmail(e.target.value) }} />
                            <FormHelperText>We will send you an OTP</FormHelperText>
                            <FormLabel className='pt-2'>OTP</FormLabel>
                            <Input type='otp' placeholder='123456'
                                isDisabled={isOtpSent ? false : true}
                                onChange={(e) => { setOTP(e.target.value) }} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme={isOtpSent ? 'whatsapp' : 'blue'}
                            onClick={isOtpSent ? handleVerify : handleRightBtn}
                        >
                            {isOtpSent ? 'Verify' : 'Send OTP'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </nav>
    )
}

export default Navbar