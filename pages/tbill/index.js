import {
  TextInput,
  Select,
  Button, NumberInput,
  Title,
  Group
} from '@mantine/core'
import Layout, { siteTitle } from '../../components/layout';

import { useState } from 'react'
export default function TBillCalculator() {
  // ... (same state and calculateInterest method) 
  const [principal, setPrincipal] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [term, setTerm] = useState(0)
  const [interestEarned, setInterestEarned] = useState(0)

  function calculateInterest() {
    const interest = principal * (interestRate / 100) * (term / 365)
    setInterestEarned(interest)
  }
  const interestRates = [
    { label: '0.5%', value: 0.5 },
    { label: '1%', value: 1 },
    { label: '3%', value: 3 },
    { label: '6%', value: 6 }
  ];
  return (
    <Layout>
      <Title>T-Bill Interest Calculator</Title>
      <Group position="center">
        <TextInput
          label="Principal"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
        />
        <NumberInput
          label="Interest Rate"
          min={0}
          max={100}
          step={0.001}
          precision={3}
          value={interestRate}
          onChange={setInterestRate}
        />
        <TextInput
          label="Term"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </Group>
      <Button onClick={calculateInterest}>Calculate</Button>
      <Title order={3}>Interest earned: {interestEarned}</Title>
    </Layout>
  )
}

