import { useNavigate } from 'react-router-dom'

function Button({ nav, text, cursor = true}) {
    const navigate = (useNavigate())
    return(
        <button
        disabled={!cursor} 
        onClick={() => navigate(nav)}
        className={`font-bold bg-[#ee2d2e] text-white py-3 w-full ${cursor ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            style={{
                fontSize: "calc(16px + 1vw)",
                boxShadow: "5px 5px 0 #fff"
            }}>
                {text}
            </button>
    )
}

export default Button