import background from '../assets/background.png'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import OnAuth from '../components/OnAuth.jsx'
import { signInAnonymously, getAuth } from 'firebase/auth'
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
        <div className="w-full h-screen flex flex-col text-white font-[Google_Sans_Flex] justify-center items-center gap-8"
        style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <OnAuth nav='/home'/>
                <p className="text-4xl">Pick a username</p>
                <form
                className="flex flex-col items-center gap-10"
                style={{width: "clamp(10rem, 15rem, 20rem)"}}
                onSubmit={handleSubmit}
                >
                    <div className="w-full gap-2 flex flex-col">
                        <input
                        placeholder="@iloveboobs"
                        onChange={(e) => checkUsername(e.target.value)}
                        value={value}
                        className="w-full bg-white text-black focus:outline-none border-3 border-[#ee2d2e] py-2 px-3 "/>
                        <p className={`text-sm ${color ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                    </div>
                    <Button text="Sign up" cursor={color} nav="/home"/>
                </form>
        </div>
    )
}

export default Username