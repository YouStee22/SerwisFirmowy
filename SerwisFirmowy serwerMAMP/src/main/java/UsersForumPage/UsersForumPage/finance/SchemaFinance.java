package UsersForumPage.UsersForumPage.finance;

import UsersForumPage.UsersForumPage.use.UserForum;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "FINANCE")
public class SchemaFinance {
    private int id;
    @OneToOne(mappedBy = "finance")
    private UserForum userForum;
    private BigDecimal balance;

    public SchemaFinance() {
    }

    public SchemaFinance(BigDecimal balance) {
        this.balance = balance;
    }

    @Id
    @GeneratedValue
    @NotNull
    @Column(name = "ID", unique = true)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    @Column(name = "BALANCE")
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "SchemaFinance{" +
                "id=" + id +
                ", balance=" + balance +
                '}';
    }
}
