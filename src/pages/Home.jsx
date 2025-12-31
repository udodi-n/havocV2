import { useEffect, useState } from "react";
import send from '../assets/send.png'
import { db, auth } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import setting from '../assets/setting.png'
import gif from '../assets/gif.png'
import OnAuth from '../components/OnAuth'
import DisplayPost from '../components/DisplayPost'
import Gif from '../components/Gif'
import cancel from '../assets/cancel.png'
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
    const [display, setDisplay] = useState(false)
    const [gifurl, setGifurl] = useState(null)

    function handleSubmit() {
        setValue('');
        setGifurl(null);
        const timeStamp = new Date()
        const tsDate = new Date(timeStamp)
        const formattedDate = tsDate.toLocaleDateString('en-US');
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
            gif: gifurl,
        }).then(() => {
            console.log("sent successfully")
        }) .catch((error) => {
            console.error("Error sending message: ", error);
        });
    }
    }

    function setGif(url) {
        setGifurl(url.url)
        console.log(url.url)
    }

    function checkLength(e, setValue, setPostLength, setDisable) {
        const inputValue = e.target.value;
        setValue(inputValue);
        const length = inputValue.length;
        setPostLength(length);
        if ((length > 0 && length <= 400) || gifurl !== null) {
            setDisable(false);
        } else {
            setDisable(true);
        } 
    }

    function enableGif() {
        if (gifurl !== null) {
            setDisable(false);
        } else {
            setDisable(true)
        }
    }



    return (
        <div className="w-full min-h-screen flex flex-col justify-start text-white font-[PT_Mono] bg-[#0c0c0c]">
            <OnAuth nextNav = '/' />
        <div className=" px-6 flex justify-between items-center w-full bg-[]"
        style={{height: "5rem"}}> 
                <Header />
            <img src={setting} alt="" className="w-4 h-auto invert"/>
        </div>
        <div className="">
            <DisplayPost />
        </div>
        <Gif display={display} url={gifurl} setDisplay={setDisplay} action={setGif}/>
        <form
        onSubmit={(e) => { e.preventDefault(); handleSubmit()}}
            className="fixed w-full flex flex-col items-center left-0 bottom-0 p-3 mb-2 h-fit" 
            style={{
                transform: `translateY(-${keyboardOffset}px)`,
                transition: "transform 0.25s ease",
            }}
            >
                <div className={`${gifurl? '' : 'hidden'} w-full flex justify-start mb-3 ml-7`}>
                    <div className="aspect-square w-25 relative bg-white rounded-lg">
                        <img src={cancel} onClick={() => setGifurl(null)} className="absolute w-4 z-100 h-auto invert top-2 right-2" alt="" />
                        <img onLoad={() => enableGif()} src={gifurl} className="opacity-70 w-full h-full object-cover" alt="" />
                    </div>
                </div>
            <div className="flex justify-center gap-2 h-12"
            style={{
                width: "calc(99% - 1.5rem)",
                }}>

                    <div className="flex bg-white lg:w-2/5 md:w-3/5 rounded-full overflow-hidden "
                    style={{
                        
                    }}>
                        <div 
                    onClick={() => setDisplay(true)}
                    className={`aspect-square h-full rounded-full flex py-2 text-white flex justify-center bg-[#fff] items-center `}> <div
                    className="w-6 h-6"
                    style={{
                        background: `#000`,
                        WebkitMaskImage: `url(${gif})`,
                        maskImage: `url(${gif})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskSize: "contain",
                    }}
            >

            </div>
            </div>
                    <textarea
                        placeholder="Uhh type..."
                        onKeyDown={(e) => {
                            // if(e.key === "@") {
                            //     console.log('tag')
                            // }
                        }}
                        className=" bg-white flex flex-1 text-black/80 h-full focus:outline-none resize-none p-3"
                        onChange={(e) => checkLength(e, setValue, setPostLength, setDisable)}
                        value={value}
                        
                    />
                </div>
                <button className={`aspect-square h-full rounded-full flex py-2 text-white flex justify-center bg-[#ee2d2e] items-center ${disable ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={disable}><div
                className="w-6 h-6"
                style={{
                    background: `#fff`,
                    WebkitMaskImage: `url(${send})`,
                    maskImage: `url(${send})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                }}
        ></div>
        </button>
                
            </div>
            </form>
        </div>
        );
    }

export default Home;
