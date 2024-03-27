package UsersForumPage.UsersForumPage.repository;

import UsersForumPage.UsersForumPage.Codes.Code;
import UsersForumPage.UsersForumPage.use.UserForum;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepositoryCode extends CrudRepository<Code, Integer> {
    @Override
    List<Code> findAll();
}
