FROM node:18
WORKDIR /app
RUN echo "Copying files...."
COPY . .
WORKDIR /app
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 5007