function DisplayPost({post}) {
    const color = localStorage.getItem("color");
    return (
        <div className="text-white gap-4 flex flex-col w-full px-10 h-[80vh] overflow-y-auto border-t-1 borer-white  py-4">
            {post.map((p) => (
                    <div key={p.id} className="flex flex-col gap-1 w-full">
                        <div className="flex flex-col gap-0 w-full">
                            <p 
                            style={{fontSize: "clamp(16px, 1vw, 19px)",
                            color: `${color}`,
                            }}>
                                {`<@${p.username}>`}</p>
                            <p style={{fontSize: "calc(12px + 0.3vw)"}}>{p.date} {p.time}</p>
                        </div>
                        <div>{p.text}</div>
                    </div>
            ))}
        </div>
    );
}

export default DisplayPost