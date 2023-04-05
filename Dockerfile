FROM node:18-alpine As base

RUN npm install -g pnpm@7.30.1


FROM base As development

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .


FROM base As build

WORKDIR /app

COPY package*.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN pnpm build

RUN pnpm prune --prod


FROM node:18-alpine As production

ENV NODE_ENV production
RUN npm install -g prisma@4.11.0

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY prisma ./prisma/

CMD [  "npm", "run", "start:migrate:prod" ]