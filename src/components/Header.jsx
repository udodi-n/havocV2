function Header() {
    return (
        <div className=" p-8 h-8 w-full flex justify-start ">
        <div className="w-fit flex place-items-center h-fit gap-1">
            <h1 className="font-[Nobulina]"
            style={{fontSize: "calc(32px + 1vw)"}}
            >HAVOC</h1>
            <p className="flex items-end w-fit">v0.0.2</p>
        </div>
        </div>
    );
}

export default Header