package UsersForumPage.UsersForumPage.use;


import UsersForumPage.UsersForumPage.finance.SchemaFinance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "usersForum")
@NoArgsConstructor
@Getter
@Setter
public class UserForum {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "rodzaj")
    private String rodzajUzytkownika;

    @Column(name = "stanowisko")
    private String stanowisko;

    @Column(name = "balance_account")
    private int balance_account;


    public UserForum(String name, String surname, String email, String avatar, String rodzajUzytkownika, String stanowisko, int balance_account) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.avatar = avatar;
        this.rodzajUzytkownika = rodzajUzytkownika;
        this.stanowisko = stanowisko;
        this.balance_account = balance_account;
    }


    public void setBalance_account(int balance_account) {
        this.balance_account = balance_account;
    }

    @Override
    public String toString() {
        return "UserForum{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", avatar='" + avatar + '\'' +
                ", rodzajUzytkownika='" + rodzajUzytkownika + '\'' +
                ", stanowisko='" + stanowisko + '\'' +
                ", balance_account=" + balance_account +
                '}';
    }


}
