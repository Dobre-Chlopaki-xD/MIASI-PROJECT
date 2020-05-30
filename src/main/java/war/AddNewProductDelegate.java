package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class AddNewProductDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    int PRODUCT_ID_DUMMY_PLS_KILL_ME;
    final int PRODUCT_MASS_DUMMY_PLS_KILL_ME = 420;
    Connection conn = null;
    Boolean isConnectionFailed = false;
    Boolean isProductPresent = false;
    try {
      Class cl = Class.forName("org.h2.Driver");
      conn = DriverManager.getConnection ("jdbc:h2:~/test", "sa","");
      Statement st = conn.createStatement();
      int productID = st.executeUpdate("INSERT INTO produkty(Nazwa_produktu, Masa_produktu) values ('Nowy produkt'," + PRODUCT_MASS_DUMMY_PLS_KILL_ME + ");", Statement.RETURN_GENERATED_KEYS);
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
