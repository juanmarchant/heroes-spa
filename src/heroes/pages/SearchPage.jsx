import { useLocation, useNavigate } from 'react-router-dom';

import { HeroCard } from '../components';
import { getHeroByName } from '../helpers';
import queryString from 'query-string';
import { useForm } from '../../hook'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroByName(q);

  const { searchText, onInputChange } = useForm({
    searchText: q
  });




  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit} aria-label='form'>
            <input
              type="text"
              placeholder="Search a hero"
              name="searchText"
              autoComplete="off"
              className="form-control "
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (q === '')
              ? <div className="alert alert-primary animate__animated animate__fadeIn" aria-label="initial-succes">Search a hero</div>
              : (heroes.length === 0)
              && <div className="alert alert-danger animate__animated animate__fadeIn" aria-label="initial-danger">No hero with <b>{q}</b></div>
          }


          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>
      </div >
    </>
  )
}
