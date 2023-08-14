import Document, { Html, Main } from 'next/document';
import { createGetInitialProps } from '@mantine/next';
import Head from 'next/head';
const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
 

}
