FROM node:23 AS build
WORKDIR /frontend
COPY frontend/ .
RUN npm install && npm run build --prod

FROM python:3.9-slim
WORKDIR /backend

COPY backend/ .
COPY requirements.txt requirements.txt
COPY --from=build /frontend/dist/frontend/browser /backend/static

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:80", "-w", "4"]