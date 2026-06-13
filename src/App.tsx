// React & Router
import { useState } from 'react'
// Mantine UI
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
// Phosphurus Icons

function App() {
  const [count, setCount] = useState(0)

  return <MantineProvider defaultColorScheme='dark'> {
    
  } </MantineProvider>
}

export default App