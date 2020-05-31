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
public class SendErrorEmailDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    EmailSender es = new EmailSender();
    es.sendMail("Błąd produktu",
            "Produkt nie został poprawnie dodany do bazy danych ponieważ został przedwcześnie zdjęty z wagi. Spróbuj ponownie.");

  }
}
