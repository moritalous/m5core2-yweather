FROM amazon/aws-lambda-nodejs:12
RUN yum -y install libX11 libXcomposite libXcursor libXdamage libXext libXi libXtst cups-libs libXScrnSaver libXrandr alsa-lib pango atk at-spi2-atk gtk3
COPY app.js package*.json ./
RUN npm install
CMD [ "app.lambdaHandler" ]
