import React, {useEffect} from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';

const Hero = ({imgSrc, h2Text, btnText}) => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const {jarallax} = await import('jarallax');
      jarallax(jarallaxElems, {speed: 0.2});
    };

    jarallaxInit();
  });

  return (
      <Box
          className={'jarallax'}
          data-jarallax
          data-speed="0.2"
          position={'relative'}
          minHeight={{xs: 400, sm: 500, md: 600}}
          display={'flex'}
          alignItems={'center'}
          marginTop={-13}
          paddingTop={13}
          id="agency__portfolio-item--js-scroll"
      >
        <Box
            className={'jarallax-img'}
            sx={{
              position: 'absolute',
              objectFit: 'cover',
              fontFamily: 'object-fit: cover;',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundImage: `url(${imgSrc})`,
            }}
        />
        <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: 1,
              height: 1,
              background: alpha('#161c2d', 0.4),
              zIndex: 1,
            }}
        />
        <Container position={'relative'} zIndex={2}>
          <Box>
            <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 900,
                  color: 'common.white',
                  textTransform: 'uppercase',
                }}
            >
              {h2Text}
            </Typography>
            <Typography
                variant="h6"
                component="p"
                color="text.primary"
                sx={{
                  color: 'common.white',
                }}
            >
              Оставьте заявку, и наш менеджер ответит на вопросы, подскажет по набору услуг и рассчитает стоимость
              уборки <br/>
              Гарантия. Качество. Безопасность.
            </Typography>
            <Box marginTop={4}>
              <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href="/order"
                  size="large"
              >
                {btnText}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};


Hero.propTypes = {
  imgSrc: PropTypes.string,
  h2Text: PropTypes.string,
  btnText: PropTypes.string,
};

export default Hero;
