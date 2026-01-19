import { config } from '@tcon360/config';
import SignupPage from './page';

export default function SignupPageWrapper() {
  return <SignupPage basePath={config.prefix} />;
}