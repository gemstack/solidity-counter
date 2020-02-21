import React from 'react';
import Container from '@material-ui/core/Container';
import Homepage from './container/Homepage';
import Header from './container/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Container disableGutters maxWidth={false}>
      <Header />
      <Homepage />
      <Footer />
    </Container>
  );
}
