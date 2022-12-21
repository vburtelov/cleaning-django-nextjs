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
  PromoList,
  Story,
  Team,
  WhoWeAre,
  Application,
} from '../components';

const Promo = () => {
  return (
    <Main colorInvert={true}>
      <Hero
        imgSrc='https://клинингпервоуральск.рф/images/2019/12/10/slider3.jpg'
        h2Text='УБОРКА ДЛЯ ВАС' btnText='Оставить заявку' />
      <Container>
        <PromoList />
      </Container>
      <Container>
        <Story />
      </Container>
      <Container paddingTop={'0 !important'}>
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
      <Contact />
      <Container>
        <Gallery />
      </Container>
      <Container maxWidth={800} paddingTop={'0 !important'}>
        <Application />
      </Container>
    </Main>
  );
};

export default Promo;
