import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate('/')} className="h-fit w-full flex items-center gap-1 justify-start ">
            <h1 className="font-[Nobulina] h-full"
            style={{fontSize: "calc(32px + 1vw)"}}
            >HAVOC</h1>
            <p className="flex items-end w-fit">v0.0.2</p>
        </div>
    );
}

export default Header