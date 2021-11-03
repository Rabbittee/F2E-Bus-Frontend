import { createServer, Factory, Model } from "miragejs";
import { identity, range, forEach } from "ramda";
import { internet, address, datatype } from "faker";

export default () =>
  createServer({
    models: {
      route: Model,
      station: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/queries/recommend", (schema) => ({
        routes: schema.all("route").models,
        stations: schema.all("station").models,
      }));
    },

    factories: {
      route: Factory.extend({
        id: datatype.uuid,
        name: () => address.zipCode(),
        URL: internet.url,
      }),

      station: Factory.extend({
        id: datatype.uuid,
        name: address.streetName,
        URL: internet.url,
      }),
    },

    seeds(server) {
      forEach(() => {
        server.create("route");
        server.create("station");
      }, range(0, 3));
    },
  });
