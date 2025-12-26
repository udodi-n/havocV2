import { useEffect, useState } from "react";
import send from '../assets/send.png'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import OnAuth from '../components/OnAuth'
import DisplayPost from '../components/DisplayPost'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function useKeyboardOffset() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!window.visualViewport) return;

        const handleResize = () => {
        const vv = window.visualViewport;
        const keyboardHeight =
            window.innerHeight - vv.height - vv.offsetTop;

        setOffset(keyboardHeight > 0 ? keyboardHeight : 0);
        };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);

    return () => {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
        };
    }, []);

    return offset;
    }

    function Home() {
    const keyboardOffset = useKeyboardOffset();
    const [value, setValue] = useState("");
    const [postLength, setPostLength] = useState(0);
    const [disable, setDisable] = useState(true);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    const color = localStorage.getItem('color')


    function handleSubmit() {
        setValue('');
        const timeStamp = new Date()
        const tsDate = new Date(timeStamp)
        const formattedDate = tsDate.toLocaleDateString();
        const formattedTime = tsDate.toLocaleTimeString();

        if (!auth.currentUser.displayName) { 
            console.warn("username not loaded");
            return;
        } else {
        addDoc(collection(db, 'messages'), {
            text: value,
            username: auth.currentUser.displayName,
            createdAt: Date.now(),
            date: formattedDate,
            time: formattedTime,
        }).then(() => {
            console.log("sent successfully")
        }) .catch((error) => {
            console.error("Error sending message: ", error);
        });
    }
    }

    function checkLength(e, setValue, setPostLength, setDisable) {
        const inputValue = e.target.value;
        setValue(inputValue);
        const length = inputValue.length;
        setPostLength(length);
        if (length > 0 && length <= 280) {
            setDisable(false);
        } else {
            setDisable(true);
        } 
    } 



    return (
        <div className="w-full min-h-screen flex flex-col justify-start text-white font-[PT_Mono] bg-[#0c0c0c]">
            <OnAuth nextNav = '/' />
        <div className="flex justify-center w-full"
        style={{height: "6rem"}}> 
            <Header />
        </div>
        <div className="">
            <DisplayPost post={posts} />
        </div>

        <form
        onSubmit={(e) => { e.preventDefault(); handleSubmit()}}
            className="fixed w-full flex flex-col items-center left-0 bottom-0 p-3 mb-2 h-18" 
            style={{
                transform: `translateY(-${keyboardOffset}px)`,
                transition: "transform 0.25s ease",
            }}
            >
            <div className="flex justify-center gap-2 h-full"
            style={{
                width: "calc(90% - 1.5rem)",
                }}>

                <textarea
                    placeholder="Uhh type..."
                    className=" bg-white text-black/80 h-full focus:outline-none resize-none p-3"
                    onChange={(e) => checkLength(e, setValue, setPostLength, setDisable)}
                    value={value}
                    style={{
                        width: "clamp(18rem, 20rem, 25rem)"
                    }}
                />
                <button className={`border-1 border-[white] aspect-square w-15 flex py-2 text-white flex justify-center items-center ${disable ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={disable}><div
                className="w-6 h-6"
                style={{
                    background: `${color}`,
                    WebkitMaskImage: `url(${send})`,
                    maskImage: `url(${send})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                }}
        ></div></button>
                
            </div>
            </form>
        </div>
        );
    }

export default Home;
