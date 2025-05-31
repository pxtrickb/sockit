'use client';
import { useSockit } from "@sockit/client";
import Link from "next/link";
export default function Home() {
  const { socket } = useSockit();

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2>SocKit Demo App</h2>
      {socket.connected && <p>Connected to SocKit</p>}
      {!socket.connected && <p>Not connected to SocKit</p>}
      <Link href="/test">Test Page</Link>
    </div>
  );
}
