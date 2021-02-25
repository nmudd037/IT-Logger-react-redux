import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteTech } from '../../actions/techActions';

const TechItem = ({ tech }) => {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = tech;

  const onDelete = () => {
    dispatch(deleteTech(id));
    M.toast({ html: `Technician ${firstName} ${lastName} deleted!` });
  };

  return (
    <li className="collection-item">
      <div>
        {firstName} {lastName}
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
};

export default TechItem;
