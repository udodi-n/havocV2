function Footer() {
    return(
        <footer className="w-full flex flex-col mt-8 text-center text-white py-2"
        style={{fontSize: "calc(8px + 0.5vw)"}}>
            <a href="/terms" className="underline">Terms & Conditions</a>
            <p>© Copyright 2025 <a href="https://x.com/ryoichi_xl" className="underline text-[#ee2d2e]" target="_blank">Ryoichi.</a> <br /> Alle Rechte vorbehalten.</p>
        </footer> 
    )
}

export default Footer