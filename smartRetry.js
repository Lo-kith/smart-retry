async function smartRetry(fn, { maxRetries = 15, delay = 1000 }) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const waitTime = delay * Math.pow(2, attempt);

      console.log(
        `Attempt ${attempt + 1} failed. Retrying in ${waitTime}ms...`
      );

      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error(
    `Failed after ${maxRetries} attempts. Last error: ${lastError.message}`
  );
}
