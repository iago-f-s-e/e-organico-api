import { capitalize } from '@src/shared/functions';
import { AddressToClient } from '../dtos/address';
import { IAddress } from '../interfaces';

type ToClient = (address: IAddress) => AddressToClient;

export const addressToClient: ToClient = address => ({
  id: address.id,
  state: capitalize(address.state),
  city: capitalize(address.city),
  district: capitalize(address.district),
  street: address.street ? capitalize(address.street) : '',
  zipCode: address.zipCode || '',
  complement: address.complement || '',
  number: address.number || 's/n',
  lat: address.lat || '',
  long: address.long || ''
});
