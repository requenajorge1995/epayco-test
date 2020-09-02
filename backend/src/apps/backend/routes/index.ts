import { Express } from 'express';
import * as glob from 'glob';

export function registerRoutes(app: Express) {
  const routes = glob.sync(__dirname + '**/*.routes.*');
  routes.map(route => register(route, app));
}

function register(routePath: string, app: Express) {
  const route = require(routePath);
  route.register(app);
}
