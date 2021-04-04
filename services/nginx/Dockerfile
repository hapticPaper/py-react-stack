
FROM nginx:alpine
# copy the build folder from react to the root of nginx (www)
#COPY --from=react-frontend /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
# start nginx 
CMD ["nginx", "-g", "daemon off;"]



