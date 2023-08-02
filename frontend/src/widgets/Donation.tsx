import { useState } from 'react';

export default function Donation(props: {
    [key: string]: string
}){
    const [amount, setAmount] = useState("");

    const handleAmountChange = (event: any) => {
      setAmount(event.target.value);
    };

    return (
        <div style={{width: '600px', margin: '20px auto'}}>
            <h1>{props.heading}</h1>
            <h2>{props.description}</h2>
            <form>
                <input type="text" placeholder="Your name" style={{width: '100%', marginBottom: '10px'}}/>
                <textarea placeholder="Your message" style={{width: '100%', height: '100px', marginBottom: '10px'}}/>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px'}}>
                    <button type="button" onClick={() => setAmount(props.first_amount)}>${props.first_amount}</button>
                    <button type="button" onClick={() => setAmount(props.second_amount)}>${props.second_amount}</button>
                    <button type="button" onClick={() => setAmount(props.third_amount)}>${props.third_amount}</button>
                    <input type="text" value={amount} onChange={handleAmountChange} placeholder="Custom amount"/>
                </div>
                <button type="submit" style={{backgroundColor: 'black', color: 'white', padding: '10px', width: '100%'}}>
                    {props.call_to_action}
                </button>
            </form>
        </div>
    );
}
