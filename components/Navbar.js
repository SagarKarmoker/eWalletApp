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
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';

function Navbar() {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRightBtn = () => {
        setIsOtpSent(true);
    }

    const handleVerify = () => {
        console.log("verified")
    }

    

    return (
        <nav className='flex justify-between p-4'>
            <div className='text-center font-bold text-2xl'>
                eWallet (Decentralized Cash App)
            </div>
            <div className='flex gap-x-4'>
                <Button colorScheme='blue' onClick={onOpen}>Sign Up</Button>
                <Button colorScheme='blue'>Login</Button>
            </div>

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
                                isRequired={true} />
                            <FormHelperText>We will send you an OTP</FormHelperText>
                            <FormLabel className='pt-2'>OTP</FormLabel>
                            <Input type='otp' placeholder='123456'
                                isDisabled={isOtpSent ? false : true} />
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