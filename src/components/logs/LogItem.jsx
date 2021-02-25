import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';

import { deleteLog, setCurrent } from '../../actions/logActions';

const LogItem = ({ log }) => {
  const dispatch = useDispatch();
  const { message, id, attention, tech, date } = log;

  const onDelete = () => {
    dispatch(deleteLog(id));
    M.toast({ html: `Log #${id} Deleted` });
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${attention ? 'red-text' : 'blue-text'}`}
          onClick={() => dispatch(setCurrent(log))}
        >
          {message}
        </a>
        <br />
        <span className="grey-text">
          <span className="bblack-text">ID #{id}</span> last updated by{' '}
          <span className="black-text">{tech}</span> on{' '}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
