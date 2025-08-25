import { FOOTER_LINKS } from '@/lib/routes'
import { NavLink } from 'react-router'

export default function Footer() {
  return (
    <footer className="p-5 bg-orange-200 text-center shrink-0">
      <div className="text-gray-400">&copy; 2025 MINJE LEE. All rights reserved.</div>
      <ul className="flex justify-center gap-3">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              title={link.label}
              className="inline-flex items-center"
            >
              <i className={link.iconClass} />
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  )
}
