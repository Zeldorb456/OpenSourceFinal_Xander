import { config } from "../config/config"
import mongoDbClient from './mongodb/mongoDbClient';

const serviceContainer = {
  config,
  mongoDbClient,
};

export default serviceContainer;

