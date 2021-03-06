# Product Details API for Threads 
This repository contains code for building the back-end services required for product Product Details data for Threads. Specifically, this repository will allow for the creation of Docker containers running Express servers as well as a PostgreSQL database containing the Product Details data. 

## Motivation
This project was implemented to allow for scaling on AWS as web traffic to the Threads site increases. 

## Tech/framework used
<b>Built with:</b>
- Express
- PostgreSQL
- Docker
- AWS (EC2, Application load balancer)

## Features
- Handles upwards of 1000 requests/second with <2000 ms response time and 0% error rate
- Utilizes all free-tier AWS services

## Installation
### Local Machine:
Pre-requisites: Have PostgreSQL and Docker installed on your computer
1) After cloning the repo locally, `npm install`
2) From the main project directory, `docker-compose up`

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.


