import { Alert } from '@mui/material';
import style from '../styles/alert.module.css';
import { useEffect } from 'react';

export default function CustomAlert({ visible, setVisible, severity, position, variant, children }){

    useEffect(() => {
        if (visible){
            const timeout = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timeout);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ visible ]);

    return (
        visible ?
            <Alert 
                severity={severity || "success"}
                onClose={() => setVisible(false)}
                variant={variant || "standard"}
                className={position === "fixed" ? style.fixed : ""}
            >
                { children }
            </Alert>
        :
            <></>
    )
}