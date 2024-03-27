package UsersForumPage.UsersForumPage.scheam.Schemato;


import UsersForumPage.UsersForumPage.scheam.SchemaUser;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface SchemaDto extends CrudRepository<SchemaUser, Integer> {
}
