/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::game.game",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const project = await strapi.documents("api::game.game").findMany({
        ...sanitizedQueryParams,
        filters: { slug: id },
      });

      const sanitizedEntity = await this.sanitizeOutput(project[0], ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
