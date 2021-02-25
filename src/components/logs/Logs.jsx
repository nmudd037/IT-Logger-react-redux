import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLogs } from '../../actions/logActions';
import PreLoader from '../layout/PreLoader';
import LogItem from './LogItem';

const Logs = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.log);
  const { logs, loading } = log;

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  if (loading || logs === null) {
    return <PreLoader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center blue-text">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <h5 className="center blue-grey-text">No logs to show...</h5>
      ) : (
        Array.isArray(logs) && logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </ul>
  );
};

export default Logs;
