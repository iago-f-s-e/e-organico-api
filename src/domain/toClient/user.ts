import { UserToClient } from '../dtos/user';
import { IUser } from '../interfaces';
import { addressToClient } from './address';

type ToClient = (user: IUser) => UserToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const userToClient: ToClient = user => {
  const isProducer = !!user.producer;
  const userType = isProducer ? 'producer' : 'consumer';

  return {
    id: user.id,
    userType,
    phone: user.phone,
    email: user.email,
    name: user.name,
    image: defaultImage,
    address: user.address?.length ? addressToClient(user.address[0]) : undefined,
    score: user.score
      ? {
          rating: user.score.rating,
          transactions: user.score.transactions
        }
      : undefined
  };
};
