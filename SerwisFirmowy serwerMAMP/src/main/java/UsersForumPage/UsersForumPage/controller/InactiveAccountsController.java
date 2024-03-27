package UsersForumPage.UsersForumPage.controller;

import UsersForumPage.UsersForumPage.inactiveAccounts.InactiveAccount;
import UsersForumPage.UsersForumPage.repository.RepositoryInactiveAccounts;
import UsersForumPage.UsersForumPage.use.UserForum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/acc")
public class InactiveAccountsController {

    @Autowired
    private RepositoryInactiveAccounts inactiveAccounts;


    @RequestMapping(method = RequestMethod.GET, value = "/getAll")
    public List<InactiveAccount> getAll() {
        return inactiveAccounts.findAll();
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteAcc")
    public void delete(@RequestParam int id) {
        inactiveAccounts.deleteById(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/get")
    public Optional<InactiveAccount> getSingleAccount(@RequestParam int id) {
        Optional<InactiveAccount> stud = inactiveAccounts.findById(id);
        return stud;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addAcc", consumes = APPLICATION_JSON_VALUE)
    public void addAcc(@RequestBody InactiveAccount inactiveAccount) {
        inactiveAccounts.save(inactiveAccount);
    }

}
