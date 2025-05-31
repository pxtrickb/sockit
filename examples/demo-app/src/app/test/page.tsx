'use client';
import { useSockit } from '@sockit/client';
import Link from 'next/link'
import React from 'react'

export default function TestPage() {
    const { socket } = useSockit();

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h2>Test Page</h2>
            {socket.connected && <p>Connected to SocKit</p>}
            {!socket.connected && <p>Not connected to SocKit</p>}
            <Link href="/">Home</Link>
        </div>
    )
}
