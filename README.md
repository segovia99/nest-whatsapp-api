# Nest WhatsApp API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

This project provides a REST API for sending WhatsApp messages using NestJS.


## Installation
Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your system.

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Usage
Once the server is up and running, you need to scan the QR code from the terminal using your WhatsApp mobile app to authenticate and establish a connection.
![image](https://github.com/segovia99/nest-whatsapp-api/assets/72715105/9ff4c6eb-d7bb-415c-8b5c-22d664e1f57c)
you can send a message by making a POST request to http://localhost:3000/api/v1/sendmessage with the following JSON payload:

```json
{
  "phone": "number phone",
  "message": "Hello"
}
```




