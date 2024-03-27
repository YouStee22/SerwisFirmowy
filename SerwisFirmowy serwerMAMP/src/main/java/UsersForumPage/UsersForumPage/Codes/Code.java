package UsersForumPage.UsersForumPage.Codes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Entity(name = "emailCode")
@NoArgsConstructor
@Getter
public class Code {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "code")
    private String code;

    @Column(name = "email")
    private String email;

    @Column(name = "date")
    private Date creationDate;


    public Code(String code, String email, Date creationDate) {
        this.code = code;
        this.email = email;
        this.creationDate = creationDate;
    }
}
