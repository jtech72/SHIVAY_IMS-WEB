import React from 'react';
import { ColorRing, RotatingLines } from 'react-loader-spinner';
const Loading = () => {
    return (
        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};


const ButtonLoading = () => {
    return (
        // <div style={{ height: "5vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <div className=" d-flex justify-content-center align-items-center w-100">
            <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />

            {/* <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> */}
        </div>
    );
};

const CartLoading = () => {
    return (
        // <div style={{ height: "5vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <div className="p-0 d-flex justify-content-center align-items-center m-0">
            <ColorRing
                visible={true}
                height="32"
                width="32"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />

            {/* <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> */}
        </div>
    );
};

export { Loading, ButtonLoading, CartLoading };
