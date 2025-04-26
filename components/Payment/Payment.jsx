import React, { useEffect, useState, useContext } from 'react';
import { ethers, parseEther } from 'ethers'; 
import { ChatAppContext } from '../../Context/ChatAppContext';
import { useLocation } from 'react-router-dom';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate=useNavigate();
  // const { address } = location.state|| null;
  if(location.state?.address==null){
    navigate('/');
  }
  const {address} =location.state;

  const [amount, setAmount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { connectingWithContract } = useContext(ChatAppContext);

  const sendPayment = async () => {
    try {
      if (!amount || isNaN(amount)) return alert("Enter valid amount");

      const contract = await connectingWithContract();
      const tx = await contract.sendPayment(address, {
        value: parseEther(amount)
      });

      setLoading(true);
      await tx.wait();
      setLoading(false);
      alert("Payment Sent!");
      fetchPaymentHistory();
      setAmount('');
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Transaction failed.");
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const contract = await connectingWithContract();
      const history = await contract.getPaymentHistory(address);
      setPaymentHistory(history);
    } catch (err) {
      console.error("Error fetching payment history", err);
    }
  };

  useEffect(() => {
    if (address) fetchPaymentHistory();
  }, [address]);

  return (
    <div className="payment-container">
      <h2 className="title">Send Payment to Friend</h2>

      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />

      <button
        onClick={sendPayment}
        disabled={loading}
        className="button"
      >
        {loading ? "Sending..." : "Send Payment"}
      </button>

      <h3 className="history-title">Payment History</h3>
      <ul className="history-list">
        {paymentHistory.length === 0 && <li>No previous payments.</li>}
        {paymentHistory.map((tx, idx) => (
          <li key={idx} className="history-item">
            Sent <b>{ethers.formatEther(tx.amount)} ETH</b> on{" "}
            {new Date(Number(tx.timestamp) * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
