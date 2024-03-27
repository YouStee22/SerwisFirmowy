package UsersForumPage.UsersForumPage.controller;



import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import UsersForumPage.UsersForumPage.repository.RepositoryFinans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/fin")
public class FinanseController {

    @Autowired
    private RepositoryFinans repositoryFinans;

    @RequestMapping(method = RequestMethod.GET, value = "/getAllFin")
    public List<SchemaFinance> getAllFinans() {
        return repositoryFinans.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/findUser")
    public Optional<SchemaFinance> addNewBalance(@RequestParam int idOfAccountBalance) {
        return repositoryFinans.findById(idOfAccountBalance);
    }


}
