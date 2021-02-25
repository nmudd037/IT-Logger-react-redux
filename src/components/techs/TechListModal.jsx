import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTechs } from '../../actions/techActions';
import TechItem from './TechItem';

const TechListModal = () => {
  const dispatch = useDispatch();
  const { techs, loading } = useSelector((state) => state.tech);

  useEffect(() => {
    dispatch(getTechs());
  }, [dispatch]);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technicians List</h4>
        <ul className="collection">
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
