# NGO network 

This projects intends to simulate a docker-compose network composite application where there're one api-gateway that proxies all comunitcation to an nginx service mesh.

  
## Components


| Component Name   |      Docker Compose service      |  port |
|----------|:-------------:|------:|
| API Gateway | api_gwt | 8080 |
| Nginx Mesh | web | 80 |
| Custom Fields | m_custom_fields | 8081 |
| Reports | m_reports | 8082 |