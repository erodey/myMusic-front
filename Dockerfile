FROM node:18-alpine
WORKDIR /my-music-app-erodey
COPY package.json package-lock.json ./
COPY . /my-music-app-erodey
RUN npm install
RUN npm install --save @fortawesome/fontawesome-svg-core
RUN npm install --save @fortawesome/free-solid-svg-icons
RUN npm install --save @fortawesome/free-regular-svg-icons
RUN npm install --save @fortawesome/free-brands-svg-icons
RUN npm i --save @fortawesome/react-fontawesome@latest
EXPOSE 3000
CMD ["npm", "start"]
