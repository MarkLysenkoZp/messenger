class Logger {
  static log(text: String) {
    var time = new Date();
  
    console.log("[" + time.toLocaleTimeString() + "] " + text);
  }
  
  // Output an error message to console.
  
  static logError(text: String) {
    var time = new Date();
  
    console.trace(`Time: ${time.toLocaleTimeString()}`);
    console.trace('Message:', text);
  }

  // Handles reporting errors. Currently, we just dump stuff to console but
  // in a real-world application, an appropriate (and user-friendly)
  // error message should be displayed.

  static reportError(errMessage: any) {
    Logger.logError(`Error ${errMessage.name}: ${errMessage.message}`);
  }
}

export default Logger;