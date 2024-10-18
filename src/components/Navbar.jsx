import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

function Navbar({ query, setQuery }) {
  const [open, setOpen] = useState(false);
  const search = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === search.current) return;

      if (e.code === 'Enter') {
        search.current.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

  return (
    <header className="navbar px-5 py-2.5 shadow bg-white flex justify-between items-center flex-wrap">
      <h1 className="text-xl uppercase">Cine Catalog</h1>

      <button className="md:hidden" onClick={handleToggle}>
        {open ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      <input
        type="search"
        className={`border bg-body p-1 rounded-md focus:outline-none focus:ring ${
          open ? 'block' : 'hidden'
        } md:block w-full md:w-auto mt-2.5 md:mt-0`}
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={search}
      />
    </header>
  );
}

export default Navbar;
