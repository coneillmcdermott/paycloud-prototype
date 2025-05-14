import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to PayCloud</h1>
      <p>This is your live payroll prototype.</p>
      <ul>
        <li><Link href="/add-employee">Add Employee</Link></li>
        <li><Link href="/add-payroll">Add Payroll Entry</Link></li>
        <li><Link href="/payroll">View Payroll Entries</Link></li>
      </ul>
    </div>
  );
}
