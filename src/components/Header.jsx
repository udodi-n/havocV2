import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    return (
        <div className="h-fit w-full flex items-center gap-1 justify-start ">
            <div onClick={() => navigate('/')} className="flex w-fit items-center gap-1">
                <h1 className="font-[Nobulina]"
                style={{fontSize: "calc(32px + 1vw)"}}
                >HAVOC</h1>
                <p className="">v0.0.2</p>
            </div>
        </div>
    );
}

export default Header