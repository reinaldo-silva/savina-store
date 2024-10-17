import Image from "next/image";

export function Header() {
  return (
    <div className="fixed left-0 top-0 z-40 w-screen">
      <div className="flex justify-center bg-zinc-950 py-2 text-xs font-bold uppercase text-white">
        Novidades em breve
      </div>
      <div className="border-b bg-white shadow-sm">
        <header className="mx-auto flex w-full max-w-screen-xl items-center justify-between p-4">
          <Image
            className="size-10"
            src={"logo.svg"}
            alt="Logo"
            width={400}
            height={400}
          />

          <div>User</div>
        </header>
      </div>
    </div>
  );
}
