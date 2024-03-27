package UsersForumPage.UsersForumPage.finance.DaoFiinance;

import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface FinanceDao extends CrudRepository<SchemaFinance, Integer> {
    List<SchemaFinance> findByBalance(int id);
}
