function DisplayPost({post}) {
        const colors = [
        "#42d824",
        "#1fa6d6",
        "#d6b21f",
        "#d61f95",
        "#d61f1f",
        "#27d61f",
        "#82b97f",
        "#a250ea",
        "#6eb223",
        "#3b5281",
        "#d476ff",
    ];
    const random = Math.floor(Math.random() * colors.length);

    return (
        <div className="text-white gap-4 flex flex-col w-full px-10 h-[80vh] overflow-y-auto border-t-1 borer-white  py-4">
            {post.map((p) => (
                    <div key={p.id} className="flex flex-col gap-1 w-full">
                        <div className="flex flex-col gap-0 w-full">
                            <p 
                            style={{fontSize: "clamp(16px, 1vw, 19px)",
                            color: `${colors[random]}`,
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