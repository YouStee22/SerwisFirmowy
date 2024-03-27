package UsersForumPage.UsersForumPage.repository;

import UsersForumPage.UsersForumPage.use.UserForum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface RepositoryUser extends CrudRepository<UserForum, Integer> {
    @Override
    List<UserForum> findAll();


}
