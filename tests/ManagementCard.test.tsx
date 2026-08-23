import { render, screen } from '@testing-library/react'
import ManagementCard from '../src/components/ManagementCard'
const props = { prefix: 'INC-', title: 'Incident Management', oneLiner: 'Detect & Respond', bullets: ['war-room','recurrence'], skills: ['Security Audit'], color: 'bg-red-500', icon: 'Siren' }
it('renders prefix, title, oneliner, skills', () => {
  render(<ManagementCard {...props} />)
  expect(screen.getByText('INC-')).toBeInTheDocument()
  expect(screen.getByText('Incident Management')).toBeInTheDocument()
  expect(screen.getByText('Security Audit')).toBeInTheDocument()
})
