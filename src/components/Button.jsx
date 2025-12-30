
function Button({ text, cursor = true}) {

    return(
        <button
        disabled={!cursor} 
        className={`font-bold bg-[#ee2d2e] text-white py-3 w-full ${cursor ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} font-[PT_Mono]`}
            style={{
                fontSize: "calc(16px + 1vw)",
                boxShadow: "5px 5px 0 #fff"
            }}>
                {text}
            </button>
    )
}

export default Button