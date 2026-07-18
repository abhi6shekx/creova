import Link from "next/link";

export default function Home() {
  return <main className="landing"><nav><b>CREOVA</b><Link href="/dashboard">Open dashboard →</Link></nav><section><p>EXPERIENCE BUILDER</p><h1>Every brand deserves its own world.</h1><span>Creova lets founders publish, manage products, bookings, memberships and customer access from one place.</span><div><Link className="primary" href="/dashboard">Start building</Link><a href="/index.html">Open legacy prototype</a></div></section></main>;
}
