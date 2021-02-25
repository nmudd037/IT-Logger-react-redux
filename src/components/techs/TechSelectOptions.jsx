import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTechs } from '../../actions/techActions';

const TechSelectOptions = () => {
  const dispatch = useDispatch();
  const { techs, loading } = useSelector((state) => state.tech);

  useEffect(() => {
    dispatch(getTechs());
  }, [dispatch]);

  return (
    !loading &&
    techs !== null &&
    techs.map((tech) => {
      return (
        <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
          {tech.firstName} {tech.lastName}
        </option>
      );
    })
  );
};

export default TechSelectOptions;
