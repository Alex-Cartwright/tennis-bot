# Testing Spring Boot

### Repositories
@DataJpaTest
It’s a specialized test annotation that provides a minimal Spring context for testing the persistence layer. 

In Spring Data JPA, repositories serve as an abstraction layer on top of JPA entities. It provides a set of methods for performing CRUD (Create, Read, Update, Delete) operations and executing custom queries. 

@DataJpaTest provides a ready-made testing environment that includes essential components for testing JPA repositories, such as the EntityManager and DataSource.

By using this annotation, an in-memory H2 database will be set up, and Spring Data JPA will be configured. 



@Autowired allows spring to automatically wire the dependency
It is annotations-driven Dependency injection.