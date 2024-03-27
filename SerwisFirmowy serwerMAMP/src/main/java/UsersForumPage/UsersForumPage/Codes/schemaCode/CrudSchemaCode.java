package UsersForumPage.UsersForumPage.Codes.schemaCode;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Transactional
@Repository
public interface CrudSchemaCode extends CrudRepository<CodeScheam, Integer> {
}
