/*
        !! Important

        Need to work on this file to dispatch clearCurrent action,
        in order to clear the current state on modal close but the 
        materialize css modal closeStart function is not working as 
        expected need to fix this.
        
        !! Important
*/

import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLog, clearCurrent, updateLog } from '../../actions/logActions';
import PreLoader from '../layout/PreLoader';
import TechSelectOptions from '../techs/TechSelectOptions';

const LogModal = () => {
  const dispatch = useDispatch();
  const currentLog = useSelector((state) => state.log.current);
  const loading = useSelector((state) => state.log.loading);

  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const elems = document.querySelectorAll('.modal');

  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }

    const options = {
      onCloseEnd: function () {
        dispatch(clearCurrent());
      },
    };

    M.Modal.init(elems, options);
  }, [currentLog, elems, dispatch]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a log message and corresponding technician' });
    } else {
      const log = currentLog
        ? {
            message,
            attention,
            tech,
            date: new Date(),
          }
        : {
            id: currentLog.id,
            message,
            attention,
            tech,
            date: new Date(),
          };

      currentLog ? dispatch(updateLog(log)) : dispatch(addLog(log));

      M.toast({ html: `Log ${currentLog ? 'updated' : 'added'} by ${tech}` });
    }

    // Clear Fields
    setMessage('');
    setTech('');
    setAttention(false);
  };

  if (loading) {
    return <PreLoader />;
  }

  const modalMessageId = currentLog ? 'editMessage' : 'addMessage';
  const modalTechId = currentLog ? 'editTech' : 'addTech';

  return (
    <div className="modal-content">
      <h4 className="blue-text">Enter System Log</h4>
      <div className="row">
        <div className="input-field">
          <input
            type="text"
            id={modalMessageId}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label htmlFor={modalMessageId} className="active">
            {currentLog ? '' : 'Log Message'}
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <select
            id={modalTechId}
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
  );
};

export default LogModal;
