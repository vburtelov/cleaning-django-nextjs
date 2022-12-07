import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { useSelector } from 'react-redux';


const Team = () => {
  const theme = useTheme();
  const cleaner = useSelector((state) => state.cleaner);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
          gutterBottom
          color={'text.secondary'}
          align={'center'}
        >
          Наша команда
        </Typography>
        <Typography
          variant='h4'
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Маленькая команда с большим опытом
        </Typography>
        <Typography variant='h6' align={'center'} color={'text.secondary'}>
          Наша цель - сделать вашу жизнь проще. Мы - лучший клининговый сервис в России.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {cleaner.cleaners.slice(0, 6).map((cleaner) => (
          <Grid item xs={12} md={4} key={cleaner.id}>
            <Box
              width={1}
              height={1}
              component={Card}
              boxShadow={0}
              variant={'outlined'}
              bgcolor={'alternate.main'}
            >
              <CardContent sx={{ padding: 3 }}>
                <ListItem component='div' disableGutters sx={{ padding: 0 }}>
                  <ListItemAvatar sx={{ marginRight: 3 }}>
                    <Avatar
                      src={cleaner.avatar_url}
                      variant={'rounded'}
                      sx={{ width: 100, height: 100, borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary={cleaner.name}
                    secondary={'Уборок: ' + cleaner.number_of_sweeps + ' ' + 'Рейтинг: ' + cleaner.rating}
                    primaryTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
