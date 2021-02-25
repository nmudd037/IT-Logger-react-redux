import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import AddBtn from './components/layout/AddBtn';
import Footer from './components/layout/Footer';
import SearchBar from './components/layout/SearchBar';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import Logs from './components/logs/Logs';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';
import store from './store';

const App = () => {
  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <div className="app">
        <SearchBar />
        <div className="app-content container">
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <Logs />
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
