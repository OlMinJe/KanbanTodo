import { NavLink } from 'react-router'

export default function Footer() {
  return (
    <footer className="p-5 bg-orange-100 text-center">
      <div className="text-gray-400">&copy; 2025 MINJE LEE. All rights reserved.</div>
      <ul className="flex justify-center gap-3">
        <li>
          <label htmlFor="emailModalToggle" className="modal-open-button">
            <i className="fa-solid fa-envelope" />
          </label>
          <input type="checkbox" id="emailModalToggle" hidden />
        </li>
        <li>
          <NavLink
            to="https://velog.io/@ol_minje/posts"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="블로그"
          >
            <i className="fa-solid fa-pen" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="https://github.com/OlMinJe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github" />
          </NavLink>
        </li>
      </ul>
    </footer>
  )
}
