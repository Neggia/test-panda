import React from 'react';
import {
    bsv,
    DefaultProvider,
    DefaultProviderOption,
    Signer,
    TAALSigner,
    PandaSigner
} from 'scrypt-ts'

const WALLET_TAAL = 0n
const WALLET_PANDA = 1n

type ConnectTAALWalletButtonProps = {
    onConnected: (signer: Signer) => void;
};

const ConnectTAALWalletButton: React.FC<ConnectTAALWalletButtonProps> = (props) => {

    const connectWallet = async (walletId: BigInt) => {
        try {
            const provider = new DefaultProvider();
            let signer: Signer

            switch (walletId) {
                case WALLET_TAAL:
                    signer = new TAALSigner(provider);
                    break;
                case WALLET_PANDA:
                    signer = new PandaSigner(provider);
                    break;
                default:
                    throw new Error('Invalid walletId');
            }

            await signer.requestAuth()
            const network = await signer.getNetwork()
            await provider.updateNetwork(network)
            await signer.connect(provider)
            console.log('connectWallet() signer.connectedProvider: ', signer.connectedProvider)

            // Call the onConnected callback and pass the initialized signer
            props.onConnected(signer);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
                alert(error.message);
            } else {
                console.error('Error:', error);
                alert(error);
            }
        }

    };

    return (
        <div>
            <div>
                <button onClick={() => connectWallet(WALLET_TAAL)}>
                    Connect TAAL Wallet
                </button>
            </div>
            <div>
                <button onClick={() => connectWallet(WALLET_PANDA)}>
                    Connect Panda Wallet
                </button>
            </div>
        </div>
    );

};

export default ConnectTAALWalletButton;
