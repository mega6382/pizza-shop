FROM nginx:1.15
# Expose the port the app runs in
EXPOSE 3000
COPY /nginx-backend.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

