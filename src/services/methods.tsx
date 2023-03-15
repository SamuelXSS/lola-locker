import api from './api';

interface CreateLocker {
  platformId: string;
  password: string;
}

interface Locker {
  data: {
    locker: {
      id: string;
      name: string;
      image: string;
      url: string;
      createdAt: string;
      updatedAt: string;
      password: string;
    };
  };
}

const getLockers = async () => {
  try {
    const {
      data: { lockers },
    } = await api.get('/lockers');

    return lockers;
  } catch (error) {
    console.error(error);
  }
};

const getPlatforms = async () => {
  try {
    const {
      data: { platforms },
    } = await api.get('/platforms');

    return platforms;
  } catch (error) {
    console.error(error);
  }
};

const createLocker = async (data: CreateLocker) => {
  try {
    const {
      data: { locker },
    }: Locker = await api.post('/lockers', data);

    return locker;
  } catch (error) {
    console.error(error);
  }
};

export { getLockers, createLocker, getPlatforms };
