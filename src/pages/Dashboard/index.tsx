import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { Search } from '@mui/icons-material';
import DashboardCard from '../../components/DashboardCard';
import Input from '../../components/Input';
import Header from '../../layout/Header';
import { getLockers } from '../../services/methods';

interface Card {
  id: string;
  name: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([] as Card[]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createdPassword, setCreatedPassword] = useState({} as Card);

  useEffect(() => {
    const loadLockers = async () => {
      setLoading(true);
      const lockers = await getLockers();
      setCards(lockers);
      setLoading(false);
    };

    loadLockers();
  }, [createdPassword]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);

    const filteredCards = cards.filter((card: Card) =>
      card.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );

    setCards((prevState) =>
      e.target.value !== '' && filteredCards.length > 0
        ? filteredCards
        : prevState
    );
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Header />
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ transition: 'all 0.3s ease-out 0s' }}
      >
        <Input
          variant="standard"
          label="Pesquisar"
          value={search}
          about={colors[0]}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search htmlColor={colors[0]} />
              </InputAdornment>
            ),
          }}
          style={{ width: 400 }}
          sx={{ marginTop: 20 }}
        />
        <DashboardCard
          cards={cards}
          isLoading={loading}
          colors={colors}
          setColors={setColors}
          setCreatedPassword={setCreatedPassword}
        />
      </Grid>
    </Box>
  );
};

export default Dashboard;
