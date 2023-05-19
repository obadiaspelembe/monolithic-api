# Embbed Monolithic Service

This project intends to simulate a monolithic service interface with 
modules splitted into containers. The experiments aims to implement all
levels of abstraction of distributed services having an api gateway, load balancer and authorization abstracted from the core business logic.

# Project structure

The project is divived in:

## API Gateway  
A Node.JS API Gateway that provides API authorization abstraction. This item expects Service Configuration and OpenAPI specifications to and acts as entrypoint and first level layer on the applications.


### CONFIGURATION
This file contains the service configurations. Make sure this matches the OpenAPI specification routes.

Example:
```
{
    "openApiFile": "OpenAPI.yaml",
    "services": [
        {
            "service": "PET",
            "service_endpoint": "http://web:8081",
            "routing_prefix": "/pet"
        },
        {
            "service": "M_REPORTS",
            "service_endpoint": "http://web:8082",
            "routing_prefix": "/m_reports"
        }
    ]
}

````

#### config

| Input | Description |
| ----------- | ----------- |
| openApiFile | OpenAPI specification filename in `YAML` format|
| services | The list of backend services targets from openapi routers pointed to the reverse proxy |

#### config:services

| Input | Description |
| ----------- | ----------- |
| service | Name of the backend target service|
| service_endpoint | Service http url within internal network (docker network)|
| service_endpoint | root endpoint for the target service |


### API Specification

Open API Specification in Swagger pattern.

```
openapi: 3.0.3
info:
  title: Swagger Petstore - OpenAPI 3.0
  contact:
    email: apiteam@swagger.io
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.11
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
servers:
  - url: https://petstore3.swagger.io/api/v3
tags:
  - name: pet
    description: Everything about your Pets
    externalDocs:
      description: Find out more
      url: http://swagger.io
  - name: store
    description: Access to Petstore orders
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
  - name: user
    description: Operations about user
paths:
  /pet:
    put:
      tags:
        - pet
      summary: Update an existing pet
      description: Update an existing pet by Id  
      responses:
        '200':
          description: Successful operation
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
        '405':
          description: Validation exception 
    post:
      tags:
        - pet
      summary: Add a new pet to the store
      description: Add a new pet to the store 
      responses:
        '200':
          description: Successful operation 
        '405':
          description: Invalid input 
 
```

### Modules
This is the core business logic folder. All business modules are configured in this section.

### Network Layer [Load Balancing]

This is the section holds the balancing layer by configuring NGINX nework proxying to API Gateway and the Module integrations.