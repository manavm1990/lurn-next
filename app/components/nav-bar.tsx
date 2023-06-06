import Link from 'next/link';
import { type ReactElement } from 'react';

export default function NavBar(): ReactElement {
  return (
    <nav>
      <ul className="mt-8 flex justify-center gap-x-8">
        <li>
          <Link href="/">Home 🏠</Link>
        </li>
        <li>
          <Link href="/notes">🎶</Link>
        </li>
      </ul>
    </nav>
  );
}
