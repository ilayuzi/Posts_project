export default function ErrorBlock({ title, message }) {
    let errorMessage = '';
  
    if (typeof message === 'string') {
      // If message is already a string, use it directly
      errorMessage = message;
    } else if (typeof message === 'object' && message.message) {
      // If message is an object with a message property, extract it
      errorMessage = message.message;
    } else {
      // Default error message if message cannot be determined
      errorMessage = 'An error occurred';
    }
  
    return (
      <div className="error-block">
        <div className="error-block-icon">!</div>
        <div className="error-block-text">
          <h2>{title}</h2>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }