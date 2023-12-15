import Calendar from 'react-calendar';
import './Calendar.css';

type Value = Date | null;

interface $Props {
  date: Value;
  setDate: (v: Value) => void;
}

export default function MiniCalendar({ date, setDate }: $Props): JSX.Element {
  return (
    <div className="relative flex">
      <Calendar
        onChange={(v: any) => {
          setDate(v);
        }}
        value={date}
      />
    </div>
  );
}
