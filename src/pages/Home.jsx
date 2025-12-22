import { useEffect, useState } from "react";

function useKeyboardOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      const vv = window.visualViewport;
      const keyboardHeight =
        window.innerHeight - vv.height - vv.offsetTop;

      setOffset(keyboardHeight > 0 ? keyboardHeight : 0);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
      window.visualViewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  return offset;
}

function Home() {
  const keyboardOffset = useKeyboardOffset();

  return (
    <div className="w-full min-h-screen flex flex-col text-white font-[Google_Sans_Flex] bg-[#1c1c1a]">
      
      <div className="flex-1 flex justify-center items-center">
        <p>Home content</p>
      </div>

      <div
        className="fixed left-0 bottom-0 w-full bg-[#1c1c1a] p-3"
        style={{
          transform: `translateY(-${keyboardOffset}px)`,
          transition: "transform 0.25s ease",
        }}
      >
        <textarea
          placeholder="Type something…"
          rows={2}
          className="w-full rounded-md p-3 text-black focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}

export default Home;
