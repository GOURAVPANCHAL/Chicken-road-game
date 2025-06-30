import React, { useState } from 'react'
import './winpopup.css'
import { motion } from 'framer-motion';

const Winpopup = () => {

    return (
        <>
            <div className="popup-overlay">
                <motion.div
                    className="popup-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 5 }}>
                    <h2>WIN!</h2>
                    <h1>x19.44</h1> 
                    <h4>+ 11.66 $</h4>
                </motion.div>
            </div>
        </>
    )
}

export default Winpopup