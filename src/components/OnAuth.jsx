import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OnAuth({nav}) {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate(nav);
            } else {
            }
        });
        return () => unsubscribe();
    }, []);

    return null;
}

export default OnAuth;