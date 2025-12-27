import background from '../assets/background.png'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import OnAuth from '../components/OnAuth.jsx'
import { signInAnonymously, getAuth, updateProfile } from 'firebase/auth'
import { query, doc, where, collection, getDocs, setDoc} from 'firebase/firestore'

function Username() {
    const [message, setMessage] = useState("");
    const [color, setColor] = useState(false);
    const [value, setValue] = useState('')
    const auth = getAuth();

    async function handleSubmit(e) {
        e.preventDefault()
        const useSplit = value.split('@')[1];
        console.log(useSplit)
        const userCred = await signInAnonymously(auth);
        const user = userCred.user;
        
        await updateProfile(user, {
            displayName: useSplit,
        });

        const uid = userCred.user.uid;
        await setDoc(doc(db, "users", uid), {
            username: useSplit,
            createdAt: Date.now(),
            uid: uid,
        })
    }

    async function checkUsername(selected) {
        const filter = selected.toLowerCase().replace(/[^a-z0-9_]/g, "");

        setValue("@"+filter)

        const q = query(collection(db, "users"),
        where("username", "==", filter)
        )

        const snapshot = await getDocs(q)
        if(snapshot.empty) {
            setMessage("Username is available")
            setColor(true)

            if (filter === '') {
            setMessage("");
            setColor(false)
            }
            if (filter.length > 15) {
                setMessage("Username is too long");
                setColor(false);
                        }
            if (filter.length < 3 && filter.length > 0) {
                setMessage("Username is too short");
                setColor(false);
            }
        }
            else {
                setMessage("Username is taken");
                setColor(false);
        }
    }

    return( 
        <div className="w-full h-screen flex flex-col text-white font-[PT_Mono] justify-center items-center"
        style={{
                background: `#1c1c1a`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <OnAuth nav='/home'/>
                <div className="bg-[#fff]  text-black flex flex-col justify-start items-center p-6"
                style={{width: "calc(20rem + 0.5vw)",
                    height: "calc(",
                    boxShadow: "5px 5px 0px #000000ff"
                }}>
                    <div className="flex flex-col items-center">
                        <h1 className="font-[Nobulina]"
            style={{fontSize: "calc(20px + 1vw)"}}
            >HAVOC</h1>
                    </div>
                    <form
                    className="flex flex-col items-center w-full gap-6 "
                    onSubmit={handleSubmit}
                    >
                    <p className="text-xl" style={{wordSpacing: "0px"}}>Create account</p>
                        <div className="w-full flex flex-col">
                            <label className="text-[15px]" htmlFor="username"> 
                            *Username </label>
                            <input
                            placeholder="@higger_nater"
                            onChange={(e) => checkUsername(e.target.value)}
                            value={value}
                            name="username"
                            className="w-full flex flex-col bg-white text-black focus:outline-none border-2 border-[#bdbdbdff] py-2 px-3 "/>
                            <p className={`text-sm ${color ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                        </div>
                        <Button text="Sign up" cursor={color} nav="/home"/>
                        <p className="text-[8px] text-center">By signing up you agree to my not-so-shady <a className="text-[#ee2d2e] underline" href="/terms">Terms & Conditions</a></p>
                    </form>
                </div>
        </div>
    )
}

export default Username