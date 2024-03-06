import Link from "next/link";

export default function CtnButton() {
  return (
    <Link href={"/pay"}>
      <button className="btn btn-active bg-black text-whiteBg hover:text-black">
        Book your ride
      </button>
    </Link>
  );
}
