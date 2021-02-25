import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchLogs } from '../../actions/logActions';
import PreLoader from './PreLoader';

const SearchBar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.log.loading);
  const text = useRef('');

  const onChange = () => {
    dispatch(searchLogs(text.current.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <nav className="mb-1 blue">
      <div className="nav-wrapper">
        <form onSubmit={onSubmit}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              placeholder="Search Logs..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
