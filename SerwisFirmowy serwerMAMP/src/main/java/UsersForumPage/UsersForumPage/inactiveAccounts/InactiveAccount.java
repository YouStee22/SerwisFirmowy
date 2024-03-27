package UsersForumPage.UsersForumPage.inactiveAccounts;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "inactiveAccounts")
@NoArgsConstructor
@Getter
public class InactiveAccount {
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


    public InactiveAccount(String name, String surname, String email, String avatar, String rodzajUzytkownika, String stanowisko) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.avatar = avatar;
        this.rodzajUzytkownika = rodzajUzytkownika;
        this.stanowisko = stanowisko;
    }
}