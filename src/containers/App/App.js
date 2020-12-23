import { BrowserRouter } from 'react-router-dom';
import './App.css';
import BugTracker from '../../components/BugTracker/BugTracker';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BugTracker />
      </div> </BrowserRouter>
  );
}
export default App;
