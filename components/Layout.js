import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h2>
              <span>Brimming</span>
              {/* <span>Marmite</span> */}
            </h2>
            {/* <h2>Spread The Joy</h2> */}
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2022 Brim Living Inc</p>
      </footer>
    </div>
  )
}