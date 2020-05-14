# base image
FROM node:12.2.0-alpine

# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

COPY . .
RUN yarn install
RUN yarn add serve
RUN yarn build
COPY build /build
EXPOSE 3000


# start app
CMD ["yarn", "serve"]