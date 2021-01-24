FROM node:15-alpine
WORKDIR /usr/src/app/
COPY . .
RUN npm install 
EXPOSE 3000
CMD ["node","index.js"]
#docker image build --tag boilerplatedemo --rm .   