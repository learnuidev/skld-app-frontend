"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="lg:px-32 p-6 bg-gray-100">
      <header className="shadow rounded-full p-3 bg-white">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-3xl pl-4 font-bold">
            peony
          </Link>

          <Link
            href="/login"
            className="font-bold rounded-full border p-2 px-4"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="">
        <section className="my-32 px-12 grid grid-cols-2 gap-32">
          <div className="max-w-xl">
            <h1 className="font-serif text-7xl font-medium">
              Your personal tutor for math and coding
            </h1>

            <p className="mt-12 text-2xl">
              A world-class tutor for every home. Built by top learning experts
              from MIT and Stanford.
            </p>

            <div className="mt-12 gap-4 flex">
              <Button
                onClick={() => {
                  router.push("/welcome?persona=learner");
                }}
                size={"lg"}
                className="px-8 py-7 text-xl shadow-lg"
              >
                I'm a Learner
              </Button>
              <Button
                onClick={() => {
                  router.push("/welcome?persona=parent_teacher");
                }}
                size={"lg"}
                variant={"outline"}
                className="px-8 py-7 text-xl text-gray-500 shadow-lg hover:shadow-none"
              >
                I'm a parent or teacher
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center ">
            <div className="relative rounded-[3rem] shadow-2xl">
              <video
                className="aspect-video max-h-[80vh] bg-white rounded-[2.25rem] object-fit"
                loop
                muted
                autoPlay
                playsInline
                src="https://brilliant.org/loggedOutHomepage/lohp-rebrand-hero-mobile.mp4"
              ></video>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
