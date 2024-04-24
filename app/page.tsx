import Features from "@/components/Features";
import Introdunction from "@/components/Introduction";
export default function Home() {
  return (
    <div className="p-5 mt-5 flex flex-col items-center">
      <div>
        <Introdunction />
        <Features />
      </div>
    </div>
  );
}
