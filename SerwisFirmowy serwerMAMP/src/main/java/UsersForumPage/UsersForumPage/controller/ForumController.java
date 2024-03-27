package UsersForumPage.UsersForumPage.controller;

import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import UsersForumPage.UsersForumPage.repository.RepositoryFinans;
import UsersForumPage.UsersForumPage.repository.RepositoryUser;

import UsersForumPage.UsersForumPage.use.UserForum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;


@RestController
//@CrossOrigin(origins = "http://localhost:4000")
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ForumController {
    @Autowired
    private RepositoryUser repositoryUser;
    @Autowired
    private RepositoryFinans repositoryFinans;





    public ForumController(RepositoryUser repositoryUser) {
        this.repositoryUser = repositoryUser;
    }

    //Show all users
    @RequestMapping(method = RequestMethod.GET, value = "/showAllUsers")
    public List<UserForum> showAllUsers() {
        return repositoryUser.findAll();
    }


    //addUserMethod
    @RequestMapping(method = RequestMethod.POST, value = "/addStudent", consumes = APPLICATION_JSON_VALUE)
    public void addStudent(@RequestBody UserForum userForum) {
        repositoryUser.save(userForum);
    }


    //deleteUser
    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteStud")
    public void deleteUser(@RequestParam int idStudent) {
        repositoryUser.deleteById(idStudent);
    }


    //updateUser
    @RequestMapping(method = RequestMethod.PUT, value = "/updateUser")
    public UserForum updateStudent(@RequestBody UserForum userForum) {
        return repositoryUser.save(userForum);
    }


    //show single user
    @RequestMapping(method = RequestMethod.GET, value = "/showSingleUser")
    public Optional<UserForum> showSingleUser(@RequestParam int id) {
        Optional<UserForum> stud = repositoryUser.findById(id);
        return stud;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/update")
    public ResponseEntity updateUser(@RequestParam int id) {
        UserForum us1 = repositoryUser.findById(id).get();

        us1.setName("Maciej");
        repositoryUser.save(us1);

        return new ResponseEntity<>(us1, HttpStatus.OK);
    }


    //Podając te parametry Param dodaj & pomiedzy
    @RequestMapping(method = RequestMethod.POST, value = "/getAccountBalance")
    public ResponseEntity getBalance(@RequestParam int id, @RequestParam Long newValue) {
        UserForum us1 = repositoryUser.findById(id).get();
        System.out.println("Id do konta balkance - " + us1.getBalance_account());
        System.out.println("Nowa wartość to - " + newValue);

        System.out.println();
        SchemaFinance schemaFinance = repositoryFinans.findById(us1.getBalance_account()).get();
        schemaFinance.setBalance(new BigDecimal(newValue));

        repositoryFinans.save(schemaFinance);
        System.out.println("saving updates with " + schemaFinance);
        System.out.println(schemaFinance);

        return new ResponseEntity(schemaFinance, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/addValueBalance")
    public ResponseEntity addValueBalance(@RequestParam int id, @RequestParam Long newValue) {
        UserForum us1 = repositoryUser.findById(id).get();
        System.out.println("Id do konta balkance - " + us1.getBalance_account());
        System.out.println("Nowa wartość to - " + newValue);

        System.out.println();
        SchemaFinance schemaFinance = repositoryFinans.findById(us1.getBalance_account()).get();

        BigDecimal oldValue = repositoryFinans.findById(id).get().getBalance();
        System.out.println("Stara wartość to - " + oldValue);
        BigDecimal latestValue = oldValue.add(BigDecimal.valueOf(newValue));
        schemaFinance.setBalance(latestValue);

        repositoryFinans.save(schemaFinance);
        System.out.println("saving updates with " + schemaFinance);
        System.out.println(schemaFinance);

        return new ResponseEntity(schemaFinance, HttpStatus.OK);
    }




    public static List<UserForum> generateUsersForum(int quantity) {
        List<UserForum> filedList = new ArrayList<>();

        for (int i = 0; i < quantity; i++) {
            filedList.add(new UserForum());
        }
        return filedList;
    }
}




