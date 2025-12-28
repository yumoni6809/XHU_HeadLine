FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY headline_user_ui/dist /usr/share/nginx/html/user
COPY headline_admin_ui/dist /usr/share/nginx/html/admin