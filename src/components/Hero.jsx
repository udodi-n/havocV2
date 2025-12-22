import luigi from '../assets/luigi.jpeg'
import Button from './Button'

function Hero() {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center gap-16">
            <div className="transform rotate-5 bg-white flex justify-center p-3 lg:hidden"
            style={{
                width: "calc(15rem + 2vw)", 
                height: "calc(15rem + 2vw)",
                boxShadow: "3px 3px 16px #ffffff1a"
            }}>
                <div className="w-full h-4/5 bg-black">
                    <img src={luigi} className="object-cover w-full h-full"/>
                </div>
            </div>
            <h1 className=""
            style={{fontSize: "clamp(45px, 4vw, 80px)",
            lineHeight: "clamp(40px, 4vw, 80px)"
            }}><span className="font-[Euro] text-[#ee2d2e]"
            style={{fontSize: "calc(80px + 1vw)"}}>MORALS</span> <br /> <span className="relative z-2">ARE ONLY FOR <br />PEOPLE WHO <br /> GET </span><span className="bg-[#ee2d2e] relative z-1 transform rotate-20">CAUGHT</span></h1>

            <Button nav="/sign-up" text="HOP IN"/>
        </div>
    );
}

export default Hero