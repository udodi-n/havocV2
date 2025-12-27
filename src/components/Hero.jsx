import luigi from '../assets/luigi.jpeg'
import Button from './Button'

function Hero() {
    return (
        <div className="font-[Google_Sans_Flex] h-screen flex flex-col justify-center items-center text-center gap-16">
            <div className="transform rotate-5 bg-white flex gap-2 flex-col text-black justify-center p-3 "
            style={{
                width: "calc(12rem + 2vw)", 
                height: "calc(12rem + 2vw)",
                boxShadow: "3px 3px 16px #ffffff1a"
            }}>
                <div className="w-full h-4/5 bg-black">
                    <img src={luigi} className="object-cover w-full h-full"/>
                </div>
                <p className="font-[Shadows_Into_Light] ">luigi.jpeg</p>
            </div>
            <h1 className=""
            style={{fontSize: "clamp(40px, 4vw, 75px)",
            lineHeight: "calc(1.7rem + 1.5vw)"
            }}><span className="font-[Euro] text-[#ee2d2e]"
            style={{fontSize: "calc(75px + 0.5vw)"}}>MORALS</span> <br /> <span className="relative z-2">ARE ONLY FOR <br />PEOPLE WHO <br /> GET </span><span className="bg-[#ee2d2e] relative z-1 transform rotate-20">CAUGHT</span></h1>

            <div style={{width: "calc(13rem + 0.5vw)"}}>
                <Button nav="/sign-up" text="HOP IN"/></div>
        </div>
    );
}

export default Hero