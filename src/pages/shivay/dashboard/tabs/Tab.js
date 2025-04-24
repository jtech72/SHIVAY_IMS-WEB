import React, { useState } from 'react';
import './Tab.css';

const Tab = ({ connectTab }) => {
    const [activeTab, setActiveTab] = useState('StockIn');

    const handleClick = (tab, item) => {
        if (tab === activeTab) {
            return;
        }
        setActiveTab(tab);
        connectTab(item);
    };

    return (
        <div>
            <div className="navbar text-dark ">
                <div
                    className={`nav-item fw-bold ${activeTab === 'StockIn' ? 'active' : ''}`}
                    onClick={() => handleClick('StockIn', 0)}>
                    Stock In
                </div>
                <div
                    className={`nav-item fw-bold ${activeTab === 'TotalDispatch' ? 'active' : ''}`}
                    onClick={() => handleClick('TotalDispatch', 1)}>
                    Total Dispatch
                </div>
            </div>
        </div>
    );
};
export default Tab;