import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Contact,
  Gallery,
  Hero,
  Partners,
  Team,
  WhoWeAre,
  Application,
} from '../components';

const Contacts = () => {
  return (
    <Main colorInvert={true}>
      <Hero
        imgSrc='https://uborka-nsk.ru/sites/uborka-nsk.ru/files/styles/banner/public/banner-city_0.jpg?itok=-u-Dk6Kz'
        h2Text='ЛУЧШИЙ КЛИНИНГ В МОСКВЕ' btnText='Заказать уборку' />
      <Contact />
      {/*<Container>*/}
      {/*  <Story />*/}
      {/*</Container>*/}
      <Container>
        <WhoWeAre />
      </Container>
      <Container maxWidth={800} paddingY={'0 !important'}>
        <Divider />
      </Container>
      <Container>
        <Team />
      </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Partners />
        </Container>
      </Box>
      <Container>
        <Gallery />
      </Container>
      <Container maxWidth={800} paddingTop={'0 !important'}>
        <Application />
      </Container>
    </Main>
  );
};

export default Contacts;
