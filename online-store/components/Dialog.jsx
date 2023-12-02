import React from 'react';
import closeIcon from '@/public/close.svg'
import Image from 'next/image';

const Dialog = ({ isOpen, children, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-10 rounded-2xl border border-gray-300 w-1/3">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-semibold">Edit your email</h2>
                    <button onClick={onClose} className="bg-[#F5F5F5] p-1 rounded-full hover:bg-[#DCDCDC]">
                        <Image src={closeIcon} alt="Close" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Dialog;