import React, { useEffect, useState } from 'react'
import hen1 from "../../images/hen1.png";
import hen2 from "../../images/hen2.png";
import hen3 from "../../images/hen3.png";
import hen4 from "../../images/hen4.png";
import hen5 from "../../images/hen5.png";
import hen6 from "../../images/hen6.png";
import hen7 from "../../images/hen7.png";
import hen8 from "../../images/hen8.png";
import hen9 from "../../images/hen9.png";
import hen10 from "../../images/hen10.png";
import hen11 from "../../images/hen11.png";
import hen12 from "../../images/hen12.png";
import hen13 from "../../images/hen13.png";
import hen14 from "../../images/hen14.png";
import hen15 from "../../images/hen15.png";
import hen16 from "../../images/hen16.png";
import hen17 from "../../images/hen17.png";
import hen18 from "../../images/hen18.png";
import hen19 from "../../images/hen19.png";
import hen20 from "../../images/hen20.png";
import hen21 from "../../images/hen21.png";
import hen22 from "../../images/hen22.png";
import hen23 from "../../images/hen23.png";
import hen24 from "../../images/hen24.png";
import hen25 from "../../images/hen25.png";
import hen26 from "../../images/hen26.png";
import hen27 from "../../images/hen27.png";
const Henframe = ({ onFrameChange }) => {
    const [frameIndex, setFrameIndex] = useState(0);
    const frames = [hen1, hen2, hen3, hen4, hen5, hen6, hen7,
        hen8, hen9, hen10, hen11, hen12, hen13, hen14, hen15,
        hen16, hen17, hen18, hen19, hen20, hen21, hen22, hen23,
        hen24, hen25, hen26, hen27,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex(prev => {
                const next = (prev + 1) % frames.length;
                onFrameChange?.(frames[next]); // ✅ Notify parent
                return next;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [onFrameChange]);

    return (
        // <div>
            <img src={frames[frameIndex]} alt="animated hen" />
        // </div>
    );
};


export default Henframe