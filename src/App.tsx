import { Routes, Route } from 'react-router';
import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import { AppShell, Group, Burger } from '@mantine/core';

import Home from './pages/Home';
import Learn from './pages/Learn';
import NavigationButton from './components/navigation/NavigationButton';
import Simulator from './pages/Simulator';
import Quiz from './pages/Quiz';
import UserAgreement from './components/UserAgreement';

function App() {
  const [opened, {toggle}] = useDisclosure();
  // Stores agreement for this current session
  const [agreed, setAgreed] = useSessionStorage({
    key: 'user-agree-to-terms',
    defaultValue: false,
  });
  const handleAgreement = () => {
    setAgreed(true);
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      transitionDuration={0}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            T1D Educational Tool
            <Group ml="xl" gap={15} visibleFrom="sm">
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
        { !agreed && (
          <UserAgreement onAgree={handleAgreement}/>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App