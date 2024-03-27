package UsersForumPage.UsersForumPage.Codes.unActiveAcc;

import jakarta.persistence.*;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "InactiveAccounts")
public class UnActiveAccSchema {
    private int id;
    private String name;
    private String surname;
    private String email;
    private String photo;
    private String rodzajUzytkownika;
    private String stanowisko;

    public UnActiveAccSchema(String name, String surname, String email, String photo, String rodzajUzytkownika, String stanowisko) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.photo = photo;
        this.rodzajUzytkownika = rodzajUzytkownika;
        this.stanowisko = stanowisko;
    }

    public UnActiveAccSchema() {
    }

    @Id
    @NotNull
    @GeneratedValue
    @Column(name = "ID", unique = true)
    public int getId() {
        return id;
    }

    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    @Column(name = "SURNAME")
    public String getSurname() {
        return surname;
    }

    @Column(name = "EMAIL")
    public String getEmail() {
        return email;
    }

    @Column(name = "AVATAR")
    public String getPhoto() {
        return photo;
    }

    @Column(name = "RODZAJ")
    public String getRodzajUzytkownika() {
        return rodzajUzytkownika;
    }

    @Column(name = "STANOWISKO")
    public String getStanowisko() {
        return stanowisko;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setRodzajUzytkownika(String rodzajUzytkownika) {
        this.rodzajUzytkownika = rodzajUzytkownika;
    }

    public void setStanowisko(String stanowisko) {
        this.stanowisko = stanowisko;
    }
}