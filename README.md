## Project setup

```bash
docker build -t crypto-price-alert-system .
```

```bash
docker run -p 3000:3000 crypto-price-alert-system
```
## Architecture
Users can add alert to alerts collection via alerts crud service for any crypto currency those store in cryptos collection. You can access them via cryptos crud service if you like. 

The crypto-price-task module in the src folder runs every ten seconds via a Cron job (see the handleFluctuations method) to check cryptocurrency prices. The cryptoService in the crypto module is responsible for retrieving prices, which are generated randomly. (generates between 0 to 2500)

The system then retrieves alerts created by users and performs two queries for each cryptocurrency:

* One query checks if the price is greater than the threshold.
* The other query checks if the price is less than the threshold.

This ensures that only relevant data from the database is used to notify users. When a price update occurs, the system emits a crypto.price.updated event, triggering the cryptoPriceUpdated method in CryptoPriceUpdatedListener. This method then calls the notify method of the notificationService via an event bus when alerts need to be sent.

Currently, the notify method only logs notifications to the console, but in the future, email or other notification methods can be implemented.

## Project & DevOps
The project is developed using NestJS (TypeScript) and MongoDB. It is a Docker-based application deployed on the DigitalOcean App Platform, a container-based service. The CI/CD pipeline is managed through GitHub Actions, automatically deploying code whenever changes are pushed to the main branch.

The database is hosted on MongoDB Atlas, and the server retrieves credentials from environment variables. If you want to run the project locally, I can provide a test cluster connection string.

You can access code through url below 
https://github.com/eyupibisoglu/crypto-price-alert-system

## Services
There are 3 REST based crud services Users, Cryptos, Alerts. Crypto is kind of reference collection for system, it keeps crypto name. Alerts keep user set alerts. 

Documentation is swagger based. You can access api documentation via url below:
https://orca-app-8agph.ondigitalocean.app/api

## Tests
The project follows a Jest-based test structure. Each module contains its own tests, including controller.spec.ts for controller tests and service.spec.ts for service tests. Additionally, there are tests located in the test folder.

## Senario
- #### User Registration and Authentication
The POST /users endpoint is intentionally left unprotected to allow user registration with custom credentials. When you create a user, the password is securely hashed. You can then obtain an access token via the /auth/login endpoint, which is required to access all other API endpoints.

- #### Managing Cryptocurrencies and Alerts
The crypto collection currently contains two cryptocurrencies by default, but you can add more if needed. To test the system, create an alert using the /alerts service. The service retrieves user details from the access token. Once an alert is created and set to active, the system checks for alert conditions every 10 seconds and sends notifications when triggered.

- #### Monitoring System Logs
You can monitor system logs using the following DigitalOcean API endpoint:
DigitalOcean Logs API (this url will share via email. it changes when deployed.)

This URL returns another link that provides access to the logs. However, access is limited to approximately one minute, so you may need to retrieve a new URL from the service after reaching the limit.

- #### Example Log Entries

- #### 1- Crypto Price Updates
These logs show the recorded prices of different cryptocurrencies at regular intervals:

```bash
crypto-price-alert-system 2025-02-02T19:57:20.093576036Z 2/2/2025, 7:57:20 PM
crypto-price-alert-system 2025-02-02T19:57:20.093730094Z Ethereum 1039
crypto-price-alert-system 2025-02-02T19:57:20.094739342Z Bitcoin 2013
crypto-price-alert-system 2025-02-02T19:57:30.093085552Z 2/2/2025, 7:57:30 PM
crypto-price-alert-system 2025-02-02T19:57:30.093238641Z Ethereum 1887
crypto-price-alert-system 2025-02-02T19:57:30.094294881Z Bitcoin 1073
crypto-price-alert-system 2025-02-02T19:57:40.090170616Z 2/2/2025, 7:57:40 PM
crypto-price-alert-system 2025-02-02T19:57:40.090475584Z Ethereum 354
crypto-price-alert-system 2025-02-02T19:57:40.090764546Z Bitcoin 2414
```
- #### 2- Notification Logs
When an alert is triggered, the system logs a notification entry like this:

```bash
crypto-price-alert-system 2025-02-02T20:00:50.360975390Z ibisoglueyup@gmail.com Crypto Price 
Price of Ethereum is now 2028 greater than your threshold of 2000
```