import M from 'materialize-css/dist/js/materialize.min.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTech } from '../../actions/techActions';

const AddTechModal = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      dispatch(
        addTech({
          firstName,
          lastName,
        })
      );
      M.toast({ html: `Technician ${firstName} ${lastName} added!` });
    }
    setFirstName('');
    setLastName('');
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>{' '}
        <div className="modal-footer" style={{ marginTop: '1rem' }}>
          <button onClick={onSubmit} className="modal-close blue waves-effect waves-blue btn">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTechModal;
