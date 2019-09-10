FROM node:10.15.1 as build-stage

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app/

# Get all the code needed to run the app
COPY . /usr/src/app/


# Install dependencies
RUN npm ci

RUN npm run build

FROM nginx:1.15
# Expose the port the app runs in
EXPOSE 4200
COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html
COPY /nginx-frontend.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

