FROM amazon/aws-lambda-nodejs:12
RUN yum install -y https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    libxkbcommon \
    google-noto-sans-japanese-fonts
COPY app.js package*.json ./
RUN npm install
CMD [ "app.lambdaHandler" ]
