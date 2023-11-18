import { symbol } from 'prop-types'
import React from 'react'
import '../css/currency.css'
const currency = ({ name, image, symbol, price, priceChange, marketcap }) => {
    return (
        <div className='stock-container'>
            <div className='stock-row'>
                <div className='stock'>
                    <img src={image} alt='crypto' />
                    <h1>{name}</h1>
                    <p className='symbol'>{symbol}</p>
                </div>
                <div className="stock-data">
                    <p className="price">PRICE: ₹{price}</p>
                    {priceChange < 0 ? (
                        <p className='stock-percent red'>{priceChange.toFixed(2)}%</p>
                    ) : (
                        <p className='stock-percent green'>{priceChange.toFixed(2)}%</p>
                    )}
                    <p className='stock-marketcap'>
                        Mkt Cap: ${marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default currency;