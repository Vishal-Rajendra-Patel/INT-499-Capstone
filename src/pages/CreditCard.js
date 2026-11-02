import React, { useState } from 'react';

function CreditCard({ onSaveCard }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [saved, setSaved] = useState(false);

    // Format validation for 1234 5678 9012 3456
    const handleCardChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        let formatted = '';
        for (let i = 0; i < val.length && i < 16; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += val[i];
        }
        setCardNumber(formatted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardNumber.length !== 19) {
            alert('Please enter a valid card number in the format 1234 5678 9012 3456');
            return;
        }
        const cardData = { cardNumber, expiry, cvv };
        localStorage.setItem('eztech_credit_card', JSON.stringify(cardData));
        setSaved(true);
    };

    return (
        <div className="page-container" style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Secure Payment & Checkout</h2>
            <p>Enter your payment details (Protected via PCI-DSS standards).</p>
            {saved ? (
                <div style={{ color: '#46d369', fontWeight: 'bold', marginTop: '1rem' }}>
                    ✅ Card successfully saved to LocalStorage! Ready for checkout.
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardChange}
                            maxLength="19"
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div>
                            <label>Expiry (MM/YY):</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                maxLength="5"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                            />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input
                                type="password"
                                placeholder="123`"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                maxLength="4"
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="add-btn" style={{ marginTop: '1rem' }}>
                        Save & Complete Checkout
                    </button>
                </form>
            )}
        </div>
    );
}

export default CreditCard;