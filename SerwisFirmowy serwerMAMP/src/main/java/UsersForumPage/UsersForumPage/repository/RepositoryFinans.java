package UsersForumPage.UsersForumPage.repository;

import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepositoryFinans extends CrudRepository<SchemaFinance, Integer> {
    @Override
    List<SchemaFinance> findAll();
}
