import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl">HOME PAGE</h1>
      <Link href={'/form'}><button className=" border-2 border-black py-2 px-4 rounded-lg my-8 hover:bg-black hover:text-white transition-all">Go to Login Page &nbsp; -></button></Link>
    </div>
  );
}
