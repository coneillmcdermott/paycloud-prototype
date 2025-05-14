import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AddPayroll() {
  const [employeeId, setEmployeeId] = useState('');
  const [hours, setHours] = useState('');
  const [payDate, setPayDate] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    supabase.from('employees').select('*').then(({ data }) => setEmployees(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = employees.find(e => e.id === employeeId);
    const gross = employee.hourly_rate * parseFloat(hours);
    const { error } = await supabase
      .from('payroll_entries')
      .insert([{ employee_id: employeeId, hours_worked: hours, gross_pay: gross, pay_date: payDate }]);
    if (error) alert('Error: ' + error.message);
    else alert('Payroll entry added!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Add Payroll Entry</h2>
      <select onChange={(e) => setEmployeeId(e.target.value)}>
        <option>Select employee</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select><br />
      <input placeholder="Hours Worked" type="number" onChange={(e) => setHours(e.target.value)} /><br />
      <input placeholder="Pay Date" type="date" onChange={(e) => setPayDate(e.target.value)} /><br />
      <button type="submit">Submit</button>
    </form>
  );
}
