package UsersForumPage.UsersForumPage.Codes.schemaCode;


import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.util.Date;



@Table(name = "EmailCode")
@Entity
public class CodeScheam {
    private int id;
    private String code;
    private String email;
    private Date creationDate;

    public CodeScheam(String code, String email, Date creationDate) {
        this.code = code;
        this.email = email;
        this.creationDate = creationDate;

    }
    public CodeScheam() {
    }

    @Id
    @GeneratedValue
    @NotNull
    @Column(name = "ID", unique = true)
    public int getId() {
        return id;
    }

    @Column(name = "CODE")
    public String getCode() {
        return code;
    }
    @Column(name = "EMAIL")
    public String getEmail() {
        return email;
    }
    @Column(name = "DATE")
    public Date getCreationDate() {
        return creationDate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}