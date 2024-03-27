package UsersForumPage.UsersForumPage.controller;

import UsersForumPage.UsersForumPage.Codes.Code;
import UsersForumPage.UsersForumPage.repository.RepositoryCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/code")
public class CodeController {

    @Autowired
    private RepositoryCode repositoryCode;

    @RequestMapping(method = RequestMethod.GET, value = "/getAll")
    public Iterable<Code> getCodes() {
        return repositoryCode.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addCode", consumes = APPLICATION_JSON_VALUE)
    public void addCode(@RequestBody Code code) {
        repositoryCode.save(code);
    }


    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteCode")
    public void deleteCode(@RequestParam int id) {
        repositoryCode.deleteById(id);
    }
}
