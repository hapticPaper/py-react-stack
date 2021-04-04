FROM node:14.16.0-alpine3.12 as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#COPY ./package.json /usr/src/app
#COPY ./package-lock.json /usr/src/app
#COPY . /usr/src/app

# add the node_modules folder to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# RUN npm cache clean --force
# RUN npm config set strict-ssl false

#RUN npm install --verbose

#RUN cp -R -p /usr/src/app /app
CMD ["sh", "copy_build.sh"]