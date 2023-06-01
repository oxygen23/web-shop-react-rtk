import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';

function Sidebar() {
  const { list } = useSelector(({ categories }) => categories);

  const newList = list.filter((_, i) => i < 5);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {newList.map((e) => (
            <li key={e.id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : null}`
                }
                to={`/categories/${e.id}`}
              >
                {e.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href='/help' target='_blank' className={styles.link}>
          Help
        </a>
        <a
          href='/terms'
          target='_blank'
          className={styles.link}
          style={{ textDecoration: 'underline' }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
}

export default Sidebar;
