import React from "react";
import { ethers } from "ethers";

function MyEthers() {
    const callBlockchain = async () => {
        const provider = new ethers.JsonRpcProvider(
            `https://sepolia.infura.io/v3/617a4f657e544795a8bf777ca806f798`
        );

        const balance = await provider.getBalance(
            "0x07fa5fFA978247D38adaF55ac1BdaF9D6c81A330"
        );

        console.log(balance);
    };

    useEffect(() => {
        callBlockchain();
    }, []);
    return <></>;
}

export default MyEthers;
