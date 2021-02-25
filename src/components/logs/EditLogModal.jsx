import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearCurrent, updateLog } from '../../actions/logActions';
import PreLoader from '../layout/PreLoader';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = () => {
  const dispatch = useDispatch();

  const currentLog = useSelector((state) => state.log.current);
  const loading = useSelector((state) => state.log.loading);

  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }
  }, [currentLog]);
  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a log message and corresponding technician' });
    } else {
      const updatedLog = {
        id: currentLog.id,
        message,
        attention,
        tech,
        date: new Date(),
      };

      dispatch(updateLog(updatedLog));
      M.toast({ html: `Log updated by ${tech}` });
      dispatch(clearCurrent());
    }
    setMessage('');
    setTech('');
    setAttention(false);
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div id="edit-log-modal" className="modal">
      <div className="modal-content">
        <h4 className="blue-text">Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="editMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {currentLog && (
              <label htmlFor="editMessage" className="active">
                Log Message
              </label>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              id="editTech"
              value={tech}
              className="browser-default pointer"
              onChange={(e) => {
                setTech(e.target.value);
              }}
              onBlur={(e) => {
                setTech(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label>
              <input
                type="checkbox"
                className="filled-in"
                checked={attention}
                value={attention}
                onChange={() => setAttention(!attention)}
              />
              <span>Needs Attention</span>
            </label>
          </div>
        </div>
        <div className="modal-footer" style={{ marginTop: '1rem' }}>
          <button onClick={onSubmit} className="modal-close blue waves-effect waves-blue btn">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLogModal;
