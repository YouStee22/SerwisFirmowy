package UsersForumPage.UsersForumPage.Codes.unActiveAcc;

import UsersForumPage.UsersForumPage.scheam.SchemaUser;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface UnActiveDTO extends CrudRepository<UnActiveAccSchema, Integer> {
}
