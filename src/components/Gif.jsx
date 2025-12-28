import { useState, useEffect } from 'react'
import cancel from '../assets/cancel.png'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

function Gif({display, setDisplay, url, action}) {
    const [value, setValue] = useState('')
    const [uid, setUid] = useState('')
    const [gif, setGif] = useState([]);
    const [gifurl, setGifurl] = useState(url)

    async function searchGif() {
        if (!uid) return

            const requests = []

            for(let i=0; i < 10; i++) {
                requests.push(fetch(`/api/gifs?p=${i}&q=${value}&uid=${uid}`).then(res => res.json())
            );
            }
            const data = await Promise.all(requests)

            const urls = data.flatMap((r) =>
                r.data.data.map((g) => g.file.sm.gif.url)
            );
            setGif(urls);

    }

    function handleGifClick(target) {
        setGifurl(target)
        
        action({
            url: target
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const uid = user.uid
            setUid(uid)
        })
    }, [])


    useEffect(() => {
        if (!uid || !value) return;

        const timeout = setTimeout(() => {
            searchGif();
        }, 400);

        return () => clearTimeout(timeout);
        }, [value, uid]);

        if (!display) return null

    return(
        <div className={`flex flex-col items-center absolute z-100 h-screen bg-white w-full p-3`}>
        <div className="h-10 w-full flex justify-center gap-6 items-center ">
            <textarea
                    placeholder="GIF"
                    onChange={(e) => setValue(e.target.value)}
                    className=" border-b-1 lg:w-2/5 md:w-2/5 border-black text-black/80 h-full overflow-x-auto focus:outline-none whitespace-nowrap p-3"
                    value={value}
                    style={{
                        
                    }}
                />
                <img onClick={() => setDisplay(false)} src={cancel} className="w-5 h-auto" alt="" /> 
        </div>
        <div className="w-full flex flex-1 mt-10 flex-wrap gap-2 h-[80vh] overflow-y-auto">
        {gif.map((giphy, i) => (
            <div
            key={i}
            className="relative w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.5rem)] md:w-[calc(20%-0.5rem)] lg:w-[calc(16.666%-0.5rem)] aspect-square overflow-hidden rounded"
            >
            <img
                src={giphy}
                onClick={() => {handleGifClick(giphy); setDisplay(false)}}
                alt=""
                className="w-full h-full object-cover"
            />
            </div>
        ))}
        </div>
        </div>
    )
}

export default Gif