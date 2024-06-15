import { ModeToggle } from "@/components/Theme-Toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <h1 className="text-6xl">HOME PAGE</h1>
        <Link href={'/form'}><Button className="mt-8">Go to Login Page &nbsp; {"->"}</Button></Link>
      </div>
    </>

  );
}
