package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class SendProductMassEmailDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    EmailSender es = new EmailSender();
    es.sendMail("Produkt zostal zmodyfikowany",
            "Do bazy danych został dodany nowy produkt o ID = " + execution.getVariable("ProductID") + " i masie wynoszącej " + execution.getVariable("productMass") + "g.");

  }
}
