import { useState } from 'react';

export default function Donation(){
    const [amount, setAmount] = useState(0);

    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

    return (
        <div style={{width: '600px', margin: '20px auto'}}>
            <h1>THANK YOU FOR YOUR SUPPORT!</h1>
            <h2>Thank you so much for your support. Leave a message with your donation and I'll try to reply!</h2>
            <form>
                <input type="text" placeholder="Your name" style={{width: '100%', marginBottom: '10px'}}/>
                <textarea placeholder="Your message" style={{width: '100%', height: '100px', marginBottom: '10px'}}/>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px'}}>
                    <button type="button" onClick={() => setAmount(5)}>$5</button>
                    <button type="button" onClick={() => setAmount(10)}>$10</button>
                    <button type="button" onClick={() => setAmount(20)}>$20</button>
                    <input type="text" value={amount} onChange={handleAmountChange} placeholder="Custom amount"/>
                </div>
                <button type="submit" style={{backgroundColor: 'black', color: 'white', padding: '10px', width: '100%'}}>Donate & Send Message</button>
            </form>
        </div>
    );
};
