# base image
FROM node:12.2.0-alpine
# add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

COPY package.json /package.json
RUN yarn install --production
COPY src /src
COPY public /public
RUN yarn build
#COPY build .

# start app
ENTRYPOINT ["yarn", "serve"]