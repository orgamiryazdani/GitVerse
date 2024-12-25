'use client';
import { signIn } from 'next-auth/react';
import { signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <p>
          Name : {session.user?.name || 'Unknown'} <br />
          Email : {session.user?.email || 'No email'} <br />
          <button onClick={() => signOut()}>SignOUT</button>
        </p>
      ) : (
        <button onClick={() => signIn('github')}>Sign In</button>
      )}
    </div>
  );
}
