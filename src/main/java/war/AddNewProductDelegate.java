package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class AddNewProductDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    Connection conn = null;
    Random generator = new Random();
    try {
      Class cl = Class.forName("org.h2.Driver");
      conn = DriverManager.getConnection ("jdbc:h2:~/test", "sa","");
      Statement st = conn.createStatement();
      int productMass = generator.nextInt(12500) + 100;
      int productID = st.executeUpdate("INSERT INTO produkty(Nazwa_produktu, Masa_produktu) values ('Nowy produkt'," + productMass + ");", Statement.RETURN_GENERATED_KEYS);
      execution.setVariable("productID", productID);
    }catch (SQLException sqle) {
      System.out.println("Blad laczenia z baza " + sqle.getMessage());
    } catch (ClassNotFoundException e) {
      System.out.println("Nie ma drivera, no sorry, cos popsules!");
    }finally{
      conn.close();
    }
  }
}
