FROM node:22-alpine
WORKDIR /app
RUN chown node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN mkdir -p .next
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
