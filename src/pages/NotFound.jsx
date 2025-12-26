function NotFound() {
    return(
        <div className="h-screen w-full text-white bg-[#ee2d2e] flex flex-col justify-center items-center font-[PT_Mono]">
            <div className="flex h-screen w-3/5 flex-col justify-center  items-start">
                <h3 className="font-bold">404</h3>
                <h1 className="text-6xl word-wrap">You're <br /> missing dawg </h1>
                <a href="/" className="py-3 underline">{`Go back >`}</a>
            </div>
        </div>
    )
}

export default NotFound