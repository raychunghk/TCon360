import { Welcome } from '../components/Welcome/Welcome';
import { MainShell } from '@/components/MainShell/MainShell';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <MainShell>
      <Welcome />
      <ColorSchemeToggle />
    </MainShell>
  );
}
