import React, { useState, useEffect } from 'react';
import './App.css';
import { useAddress, useContract, ConnectWallet, useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import Siclogo from '/SIC logo-final.png';
import { ThirdwebSDK } from '@thirdweb-dev/react';
import { RootstockTestnet } from "@thirdweb-dev/chains";

function App() {
  const sdk = new ThirdwebSDK(RootstockTestnet);
  const address = useAddress();
  const [recentProposal, setRecentProposal] = useState('');
  const [description, setDescription] = useState('');

  const { contract } = useContract("0xFac9695f6c106FE47431B3863E9C19D70b541bCa");
  const { data, isLoading, error } = useContractRead(contract, "getAllProposals");
  const { mutateAsync, isLoading: isWriting, error: writeError } = useContractWrite(contract, "propose", []);

  useEffect(() => {
    if (data && !isLoading) {
      const lastString = data[0]?.description || 'No proposals available';
      setRecentProposal(lastString);
    }
  }, [data, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutateAsync({ args: [description] });
      setDescription('');
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <img src={Siclogo} alt="SIC logo" style={styles.logoImage} />
      </div>
      <h2 style={styles.title}>Student Interest Collective</h2>
      <div style={styles.content}>
        <p><strong>Revolutionize</strong> student debt repayment using Bitcoin and blockchain.</p>
        <p><strong>Empower</strong> students to collaboratively and efficiently pay off loans.</p>
        <p><strong>Join us</strong> to take control of your financial future, support fellow students, and <strong>harness the power</strong> of cryptocurrency for debt freedom.</p>
        <p><strong>Transform</strong> your debt repayment journey with <strong>innovative financial savvy</strong>.</p>
        <h4>Most Recent Proposal</h4>
        <p>{recentProposal}</p>
      </div>
      <div style={styles.wallet}>
        <ConnectWallet />
      </div>
      <h1>Propose Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <Web3Button
          contractAddress='0xFac9695f6c106FE47431B3863E9C19D70b541bCa'
          action={() => mutateAsync({ args: ['', '', '',description] })}
          isLoading={isWriting}
          disabled={isWriting}
        >
          Submit Your Proposal
        </Web3Button>
        {writeError && <p style={styles.error}>Error submitting proposal: {writeError.message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #f0f0f0, #d9d9f3)',
    fontFamily: 'Arial, sans-serif',
    color: '#4b0082',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
  },
  logoImage: {
    height: '100px', // Adjust based on your logo size
  },
  title: {
    fontSize: '24px',
    margin: '20px 0',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  wallet: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    background: '#4b0082',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default App;
