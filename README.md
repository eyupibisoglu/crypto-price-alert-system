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


