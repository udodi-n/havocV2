import { useEffect, useState } from 'react'
import { db } from '../firebase'
import badge from '../assets/badge.svg'
import { onSnapshot, collection } from 'firebase/firestore'
function DisplayPost({post}) {
    const [color, setColor] = useState('')
        const colors = [
        "#42d824",
        "#1fa6d6",
        "#d6b21f",
        "#d61f95",
        "#d61f1f",
        "#27d61f",
        "#82b97f",
        "#8f3cd8ff",
        "#6eb223",
        "#3b5281",
        "#d476ff",
        "#1fbe5cff",
        "#d1ff02ff",
        "#1302ffff",
        "#ff7c02ff",
    ];
    const [posts, setPosts] = useState([])
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const random = Math.floor(Math.random() * colors.length);
        setColor(colors[random]);
        localStorage.setItem('color', colors[random])
    }, []);

        useEffect(() => {
            const updateHome = onSnapshot(collection(db, "messages"), (snapshot) => {
            const postArray = snapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => b.createdAt - a.createdAt);
                setPosts(postArray);
            }); 
    
            return () => updateHome();
        }, []);

        useEffect(() => {

        }, [posts])


    return (
        <div className="text-white gap-4 flex flex-col w-full px-10 h-[80vh] overflow-y-auto border-t-1 borer-white  py-4">
            {posts.map((p) => (
                    <div key={p.id} className="flex flex-col gap-1 w-full">
                        <div className="flex flex-col gap-0 w-full">
                            <div className="w-full flex">
                                <p
                                style={{fontSize: "clamp(16px, 1vw, 19px)",
                                color: `${color}`,
                                }}>
                                    {`<@${p.username}>`}</p>
                                    {/* <img src={badge} alt="" /> */}
                            </div>
                            <p style={{fontSize: "calc(12px + 0.3vw)"}}>{p.date} {p.time}</p>
                        </div>
                        <div>{p.text}</div>
                    </div>
            ))}
        </div>
    );
}

export default DisplayPost