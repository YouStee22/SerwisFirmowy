package UsersForumPage.UsersForumPage.repository;

import UsersForumPage.UsersForumPage.Codes.Code;
import UsersForumPage.UsersForumPage.inactiveAccounts.InactiveAccount;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepositoryInactiveAccounts extends CrudRepository<InactiveAccount, Integer> {
    @Override
    List<InactiveAccount> findAll();
}
