import { BrowserRouter, Routes } from 'react-router-dom';
import { EventPage } from './pages/EventPage';
import { Router } from './Router';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
