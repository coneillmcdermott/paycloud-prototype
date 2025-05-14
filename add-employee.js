import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AddEmployee() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('employees')
      .insert([{ user_id: user.data.user.id, name, position, hourly_rate: rate }]);
    if (error) alert('Error: ' + error.message);
    else alert('Employee added!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Add Employee</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Position" onChange={(e) => setPosition(e.target.value)} /><br />
      <input placeholder="Hourly Rate" type="number" onChange={(e) => setRate(e.target.value)} /><br />
      <button type="submit">Add</button>
    </form>
  );
}
