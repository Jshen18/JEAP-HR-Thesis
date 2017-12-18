import mysql from 'mysql';
import { Promise } from 'bluebird';
import {
  randomCity, randomNeighborhood, experienceInventoryDataNew, experienceInventoryData,
  reservationsIncoming, clientRequestingForUser
} from './sql_seed_data';
import server from '../server/index';

