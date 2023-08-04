FROM cypress/included:12.11.0

COPY e2e-scripts /app/

WORKDIR /app

RUN CYPRESS_INSTALL_BINARY=0 npm ci --legacy-peer-deps

COPY projects/angular-app-e2e /app/projects/angular-app-e2e
COPY modern /app/modern
COPY tsconfig.base.json /app/

ENTRYPOINT []
