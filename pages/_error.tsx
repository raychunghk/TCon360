import React from 'react';
import { NextPage, NextPageContext } from 'next';

interface ErrorPageProps {
  statusCode: number;
  errorMessage: string;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, errorMessage }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>Status Code: {statusCode}</p>
      <p>Message: {errorMessage}</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = err ? err.message : 'Page not found';

  return { statusCode, errorMessage };
};

export default ErrorPage;
