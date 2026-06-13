import { Routes, Route } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger } from '@mantine/core';
import Home from './pages/Home';
import NavigationButton from './components/navigation/NavigationButton';

function App() {
  const [opened, {toggle}] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            T1D Educational Tool
            <Group ml="xl" gap={10} visibleFrom="sm">
              <NavigationButton to='/' buttonText="Home"/>
              <NavigationButton to='learn' buttonText="Learn"/>
              <NavigationButton to='simulator' buttonText="Simulator"/>
              <NavigationButton to='quiz' buttonText="Quiz"/>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavigationButton to='/' buttonText="Home"/>
        <NavigationButton to='learn' buttonText="Learn"/>
        <NavigationButton to='simulator' buttonText="Simulator"/>
        <NavigationButton to='quiz' buttonText="Quiz"/>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App