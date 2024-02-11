import Features from "@/components/Features";
import Introdunction from "@/components/Introduction";
import FetchData from "@/components/FetchData";
export default function Home() {
  const status = "authenticated";
  return (
    <div className="p-5 mt-5 flex flex-col items-center">
      {status === "authenticated" ? (
        <div>
          <FetchData />
        </div>
      ) : (
        <div>
          <Introdunction />
          <Features />
        </div>
      )}
    </div>
  );
}
