import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import background from '../assets/background.png'

function Landing() {
    return (
    <div
        className="relative w-full min-h-screen font-[PT_Mono] p-6 text-white flex flex-col items-center justify-between"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <Header />
            <Hero />
            <Footer />
        </div>
    );
}
export default Landing