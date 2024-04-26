import CreateSummary from "@/components/CreateSummary";
import Features from "@/components/Features";
import Introdunction from "@/components/Introduction";
import { auth } from "@/utils/auth";
export default async function Home() {
  const session = await auth();
  return (
    <div className="p-5 mt-5 lg:container flex flex-col items-center">
      {session ? (
        <div>
          <CreateSummary />
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
