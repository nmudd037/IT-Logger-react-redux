import M from 'materialize-css/dist/js/materialize.min.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';

const AddLogModal = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a log message and corresponding technician' });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };
      dispatch(addLog(newLog));
      M.toast({ html: `Log added by ${tech}` });
    }
    // Clear Fields
    setMessage('');
    setTech('');
    setAttention(false);
  };

  return (
    <div id="add-log-modal" className="modal">
      <div className="modal-content">
        <h4 className="blue-text">Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="addMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="addMessage" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              id="addTech"
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

export default AddLogModal;
