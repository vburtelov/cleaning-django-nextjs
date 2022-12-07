/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const WhoWeAre = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
      <Box>
        <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
          <Grid
              item
              container
              alignItems={'center'}
              justifyContent="center"
              xs={12}
              md={6}
          >
            <Box>
              <Typography variant={'h4'} gutterBottom sx={{fontWeight: 700}}>
                Кто мы?
              </Typography>
              <Typography component={'p'} color={'text.secondary'}>
                Качество наших услуг стоит на трех китах: персонал, профессиональная химия и оборудование.
                <br/>
                Но компания «Cleany» – это нечто большее…
                <br/>
                Компания несет ответственность, дает гарантии своим клиентам – это будет прописано и в вашем договоре
                услуг. Качество выполненных работ контролируется технологом.
                <br/>
                Работаем для тех, кто хочет знать стоимость и время уборки заранее. Для тех, кто привык к оправданным
                ценам. Для тех, кто знает, за что платит.
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
            <Box>
              <Typography variant={'h4'} gutterBottom sx={{fontWeight: 700}}>
                Что мы делаем?
              </Typography>
              <Typography component={'p'} color={'text.secondary'}>
                Компания "Cleany", оказывающая сервисное обслуживание по клинингу, проводит для своих заказчиков уборку квартир.
                <br/>
                Данный вид сервиса охватывает полный комплекс уборочных работ помещений, очистку мебели,
                сантехнического оборудования, ковров, ковровых покрытий, мытье окон.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default WhoWeAre;
