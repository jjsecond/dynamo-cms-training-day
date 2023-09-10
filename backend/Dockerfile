FROM node:18
WORKDIR /app

COPY package.json .

RUN npm install
COPY . ./
# does not do anything
EXPOSE 3050
CMD ["npm", "run", "dev"]

