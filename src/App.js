import Calendar from './components/Calendar/Calendar';

const now = new Date();

function App() {
  return (
    <div>
      <Calendar date={now} />
    </div>
  );
}

export default App;
