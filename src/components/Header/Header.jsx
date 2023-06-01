import { Link, useNavigate } from 'react-router-dom';
import { toggleForm } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../utils/routes';

import styles from '../../styles/Header.module.css';
import AVATAR from '../../images/avatar.jpg';
import LOGO from '../../images/logo.svg';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [searchValue, setSearchValue] = useState('');

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR });

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt='Stuff' />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className='icon'>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type='search'
              name='search'
              placeholder='Search for anything....'
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? 'Loading'
                : !data.length
                ? 'No result'
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        onClick={() => setSearchValue('')}
                        className={styles.item}
                        key={id}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles['icon-fav']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && <span className={styles.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
