import React from 'react';
import Container from '@material-ui/core/Container';
import { Router } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import history from './history';
import routes from '../routes';

export default function App() {
  return (
    <Router history={history}>
      <Container disableGutters maxWidth={false}>
        <Header />
        {routes}
        <Footer />
      </Container>
    </Router>
  );
}
