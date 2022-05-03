FROM nginx:stable-alpine

LABEL maintainer="siger"

ARG PORT

RUN echo $PORT

# local development image test
ENV PORT=80

ENV VAR__API_URL=http://localhost:8000/
ENV VAR__CONTEXT=app

COPY build /opt/app
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#CMD nginx -g 'daemon off;'
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && rm -rf /usr/share/nginx/html;mkdir -p "/usr/share/nginx/html/$VAR__CONTEXT";cp -r /opt/app/* "/usr/share/nginx/html/$VAR__CONTEXT/"; printenv|grep 'VAR__'|while IFS='=' read -r name value ; do grep -rl $name /usr/share/nginx/html/* | xargs sed -i '' -e "s#$name#$value#g" ; done; nginx -g 'daemon off;'