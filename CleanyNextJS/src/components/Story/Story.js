/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Story = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
      <Box>
        <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
          <Grid item container alignItems={'center'} xs={12} md={6}>
            <Box>
              <Typography variant={'h4'} gutterBottom sx={{fontWeight: 700}}>
                О нас
              </Typography>
              <Typography component={'p'}>
                Заказать уборку квартиры в Москве недорого можно на сайте или в мобильном приложении сервиса Cleany.
                <br/>
                Получить оперативную поддержку — через мессенджеры или по телефону.
                <br/>
                <br/>
                Мы заботимся о вашей безопасности, поэтому тысячи клиентов доверяют нам свои дома.
                Оплата уборки проходит через защищённое соединение: ваша банковская карта в безопасности.
                Если вдруг что-то пойдёт не так, мы проследим, чтобы вам возместили ущерб.
              </Typography>
            </Box>
          </Grid>
          <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={12}
              md={6}
          >
            <Box maxWidth={500} width={1}>
              <Box
                  component={'img'}
                  src={
                    'https://i.ibb.co/ydqX120/Image-Pasted-2022-11-11-at-05-29-43.png'
                  }
                  width={1}
                  height={1}
                  sx={{
                    filter:
                        theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
                    borderRadius: 2,

                  }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Story;
