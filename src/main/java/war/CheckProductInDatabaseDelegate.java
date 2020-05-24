package war;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.util.Random;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
public class CheckProductInDatabaseDelegate implements JavaDelegate {
  public void execute(DelegateExecution execution) throws Exception {
    Random rn = new Random();
    execution.setVariable("isProductPresent", rn.nextBoolean());
  }
}
