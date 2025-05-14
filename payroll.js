import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Payroll() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    supabase.from('payroll_entries').select('*, employees(name)').then(({ data }) => setEntries(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Payroll Entries</h2>
      <ul>
        {entries.map(e => (
          <li key={e.id}>
            {e.employees?.name} — {e.gross_pay} EUR for {e.hours_worked} hrs on {e.pay_date}
          </li>
        ))}
      </ul>
    </div>
  );
}
