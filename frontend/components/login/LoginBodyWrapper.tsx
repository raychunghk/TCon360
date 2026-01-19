import { config } from '@tcon360/config';
import LoginBody from './LoginBody';

export default function LoginBodyWrapper() {
  return <LoginBody basePath={config.prefix} />;
}