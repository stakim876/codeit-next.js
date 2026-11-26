// ~/instagram-next/components/NavLink.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 지금 주소와 href가 같으면 active 클래스를 붙여 현재 메뉴를 표시
export default function NavLink({ href, className, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? `${className} active` : className}
      aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
}
