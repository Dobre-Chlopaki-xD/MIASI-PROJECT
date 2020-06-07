package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.sql.*;
import java.util.Random;
import java.util.logging.Logger;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class CheckProductInDatabaseDelegate implements JavaDelegate {

  private final Logger LOGGER = Logger.getLogger(LoggerDelegate.class.getName());

  public void execute(DelegateExecution execution) throws Exception {
    final int PRODUCT_ID = (int)(execution.getVariable("ProductID")==null? -1 : execution.getVariable("ProductID"));
    Connection conn = null;
    try {
      Class cl = Class.forName("org.h2.Driver");
      conn = DriverManager.getConnection ("jdbc:h2:~/test", "sa","");
      Statement st = conn.createStatement();
      ResultSet rs = st.executeQuery("Select * from PRODUKTY");
      if(rs.next()==false) {
        execution.setVariable("isProductPresent", false);
        return;
      }
      execution.setVariable("isProductPresent", false);
      while (rs.next()) {
        int productID = rs.getInt("IDProduktu");
        if(productID==PRODUCT_ID) {
          execution.setVariable("isProductPresent", true);
          return;
        }
      }
    }catch (SQLException sqle) {
      System.out.println("Blad laczenia z baza " + sqle.getMessage());
      throw sqle;
    } catch (ClassNotFoundException e) {
      System.out.println("Nie ma drivera, no sorry, cos popsules!");
      throw e;
    }finally{
      conn.close();
    }
  }
}
