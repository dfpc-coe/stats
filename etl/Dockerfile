FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /usr/local/src/etl
ADD . /usr/local/src/etl

RUN npm install

CMD node index.js
