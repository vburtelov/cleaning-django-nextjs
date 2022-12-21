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
    Story,
    Team,
    WhoWeAre,
    Application,
    CleaningTypes,
} from '../components';

const Cleaning = () => {
    return (
        <Main colorInvert={true}>
            <Hero imgSrc='https://www.upscalelivingmag.com/wp-content/uploads/2020/09/cleaning-services.jpeg'
                  h2Text='УБОРКА КВАРТИР В МОСКВЕ' btnText='Заказать уборку'/>
            <Container>
                <CleaningTypes/>
            </Container>
            <Container>
                <Story/>
            </Container>
            <Container paddingTop={'0 !important'}>
                <WhoWeAre/>
            </Container>
            <Container maxWidth={800} paddingY={'0 !important'}>
                <Divider/>
            </Container>
            <Container>
                <Team/>
            </Container>
            <Box bgcolor={'alternate.main'}>
                <Container>
                    <Partners/>
                </Container>
            </Box>
            <Contact/>
            <Container>
                <Gallery/>
            </Container>
            <Container maxWidth={800} paddingTop={'0 !important'}>
                <Application/>
            </Container>
        </Main>
    );
};

export default Cleaning;
