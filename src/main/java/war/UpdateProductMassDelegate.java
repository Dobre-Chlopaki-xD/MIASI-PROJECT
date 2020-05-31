package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.sql.*;
import java.util.Random;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class UpdateProductMassDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    final int PRODUCT_ID = (int)execution.getVariable("ProductID");
    Connection conn = null;
    Random generator = new Random();
    try {
      Class cl = Class.forName("org.h2.Driver");
      conn = DriverManager.getConnection ("jdbc:h2:~/test", "sa","");
      Statement st = conn.createStatement();
      int productMass = generator.nextInt(12500) + 100;
      st.executeUpdate("Update produkty set Masa_produktu=" +
              productMass +
              "where IDProduktu=" +
              PRODUCT_ID);
      execution.setVariable("productID", PRODUCT_ID);
    }catch (SQLException sqle) {
      System.out.println("Blad laczenia z baza " + sqle.getMessage());
    } catch (ClassNotFoundException e) {
      System.out.println("Nie ma drivera, no sorry, cos popsules!");
    }finally{
      conn.close();
    }
  }
}
