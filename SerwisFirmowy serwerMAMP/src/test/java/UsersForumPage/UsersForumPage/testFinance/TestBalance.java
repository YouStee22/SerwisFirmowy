package UsersForumPage.UsersForumPage.testFinance;

import UsersForumPage.UsersForumPage.finance.DaoFiinance.FinanceDao;
import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import UsersForumPage.UsersForumPage.scheam.SchemaUser;
import UsersForumPage.UsersForumPage.scheam.Schemato.SchemaDto;
import UsersForumPage.UsersForumPage.use.UserForum;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestBalance {

    @Autowired
    private FinanceDao financeDao;
    @Autowired
    private SchemaDto schemaDto;

    @Test
    public void testAddMoney() {
        //Given
        SchemaFinance schemaFinance = new SchemaFinance(new BigDecimal(1000));
        financeDao.save(schemaFinance);
        int id = schemaFinance.getId();
        System.out.println("Id - " + id);
        //When
        Optional<SchemaFinance> resultList = financeDao.findById(id);
        //Then
        Assert.assertTrue(resultList.isPresent());
        //CleanUp
        financeDao.deleteById(id);
    }


    @Test
    public void testAddUserWithFinance() {
        //Given
//        SchemaUser schemaUser = new SchemaUser();
//        schemaUser.setSchemaFinance(new SchemaFinance(new BigDecimal(5000)));
//        schemaDto.save(schemaUser);
        //When
//        int id = schemaUser.getId();
//        System.out.println("=====================" + id);
        schemaDto.deleteById(1252);
        financeDao.deleteById(52);
        //Then
//        Assert.assertEquals(schemaDto.findById(schemaUser.getId()), id);
        //CleanUp
//        schemaDto.deleteById(id);
    }


    @Test
    public void testAddUserAgainWithMoney() {
        //Given
        SchemaUser us1 = new SchemaUser("Krystian", "Bednarski", "KrystekBednarczyk@gmail.com", "https://reqres.in/img/faces/1-image.jpg", "Pracownik", "Designer");
        us1.setSchemaFinance(new SchemaFinance(new BigDecimal(1599)));
        SchemaUser us2 = new SchemaUser("Maciej", "Bednarski", "bednaroMaciej@wp.pl", "https://reqres.in/img/faces/9-image.jpg", "Admin", "Java Developer");
        us2.setSchemaFinance(new SchemaFinance(new BigDecimal(17234)));
        SchemaUser us3 = new SchemaUser("Julia", "Kochańczyk", "julkaKochań2734@gmail.com", "https://reqres.in/img/faces/7-image.jpg", "Pracownik", "Analyst");
        us3.setSchemaFinance(new SchemaFinance(new BigDecimal(700)));

        schemaDto.save(us1);
        schemaDto.save(us2);
        schemaDto.save(us3);
        //When

        //Then

    }

    @Test
    public void findUser() {
        //Given
        Optional<SchemaUser> us1 = schemaDto.findById(1);
        SchemaUser option = us1.get();
        //When
        option.setSchemaFinance(new SchemaFinance(new BigDecimal(9999)));
        //Then
        schemaDto.deleteById(1);
        schemaDto.save(option);

    }
}
